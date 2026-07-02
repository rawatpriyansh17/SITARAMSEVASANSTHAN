import {
  convertToModelMessages,
  streamText,
  type UIMessage,
} from 'ai';
import { z } from 'zod';

import { ensureGatewayEnv } from '@/lib/ai-env';
import { searchCmsKnowledge, type CmsSearchResult } from '@/lib/cms-ai-search';

export const runtime = 'nodejs';
export const maxDuration = 30;

const MAX_MESSAGES = 8;
const MAX_USER_TEXT_LENGTH = 1000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 12;

const rateLimitBucket = new Map<string, { count: number; resetAt: number }>();

const verifiedSiteFacts = [
  {
    title: 'Mission and motto',
    url: 'https://sitaramsevasansthan.org/about',
    content:
      'Sitaram Seva Sansthan works with the motto Seva se Samadhan, meaning finding solutions through service.',
  },
  {
    title: 'Donation options',
    url: 'https://sitaramsevasansthan.org/donate/#donate-checkout',
    content:
      'Visitors can donate online through Razorpay on the donate page, scan the UPI QR code, or use bank transfer details. Razorpay opens only after the visitor clicks Pay Securely on the donation form.',
  },
  {
    title: 'Bank details for donations',
    url: 'https://sitaramsevasansthan.org/donate/#bank-details',
    content:
      'Donation bank details: Account Name सीताराम सेवा संस्थान, Account Number 50100749971577, IFSC HDFC0001240, Bank HDFC Bank, Branch Janjeerwala Chouraha Branch, Indore.',
  },
  {
    title: 'Contact details',
    url: 'https://sitaramsevasansthan.org/#bottom-of-page',
    content:
      'Contact Sitaram Seva Sansthan at +91 9111311301 or sansthansitaramseva@gmail.com. Address: 110, Shreyansnath Apartment 3/2, Near Shalby Hospital, Dr R.S. Bhandari Marg, Indore, Madhya Pradesh, India.',
  },
  {
    title: 'Services and programs',
    url: 'https://sitaramsevasansthan.org/#services',
    content:
      'Programs include breast cancer aid, chemotherapy medicine aid, ovarian cancer care, Pap smear test camps, oral cancer screening camps, blood donation and health check-up camps, essential supplies for government school students, and free thermal mammography tests.',
  },
];

const chatSchema = z.object({
  messages: z.array(z.custom<UIMessage>()).min(1).max(20),
});

function getTextFromMessage(message: UIMessage) {
  return message.parts
    .filter((part) => part.type === 'text')
    .map((part) => part.text)
    .join(' ')
    .trim();
}

function buildVerifiedFactsContext() {
  return verifiedSiteFacts
    .map((fact, index) => {
      return [
        `[Verified ${index + 1}] ${fact.title}`,
        `URL: ${fact.url}`,
        `Content: ${fact.content}`,
      ].join('\n');
    })
    .join('\n\n');
}

function buildContext(results: CmsSearchResult[], searchFailed: boolean) {
  const fallbackFacts = buildVerifiedFactsContext();

  if (results.length === 0) {
    return searchFailed
      ? `CMS knowledge search is temporarily unavailable. Use only these verified fallback facts and do not invent missing event/post details.\n\n${fallbackFacts}`
      : `No matching CMS post or event was found for this question. You may use these verified site facts for critical donation, contact, mission, and service information.\n\n${fallbackFacts}`;
  }

  const cmsContext = results
    .map((result, index) => {
      return [
        `[${index + 1}] ${result.title}`,
        `Source: ${result.sourceType}`,
        `URL: ${result.url}`,
        `Content: ${result.content}`,
      ].join('\n');
    })
    .join('\n\n');

  return `${cmsContext}\n\nVerified fallback facts for critical donation/contact details:\n${fallbackFacts}`;
}

function buildSystemPrompt(context: string) {
  return `
You are the helpful website assistant for Sitaram Seva Sansthan.

Use the provided CMS/site context to answer visitor questions about programs, events, donations, contact details, and navigation.

Rules:
- Answer in the user's language when possible. Hinglish is fine when the user writes Hinglish but answer in english if the user writes in english.
- Keep answers warm, clear, and concise.
- Prefer concrete page links from the context when guiding visitors.
- Never send visitors to /events because the website does not have a general events listing page. For upcoming programs use /latest-event. For a specific past event, use only the exact /events/[slug] URL found in the context.
- For donation questions, guide users to /donate/#donate-checkout and mention that Razorpay opens only after they click Pay Securely.
- Do not claim that you can process payments inside chat.
- Do not provide medical diagnosis, emergency guidance, or treatment decisions. Encourage users to consult qualified medical professionals.
- If the context does not contain the answer, say so honestly and suggest the contact section or relevant page.
- Use plain text and plain URLs. Avoid markdown tables.

CMS/site context:
${context}
`.trim();
}

function getStreamErrorMessage(error: unknown) {
  const message =
    error instanceof Error
      ? error.message
      : typeof error === 'string'
        ? error
        : '';

  if (/rate[_\s-]?limit|429|free tier/i.test(message)) {
    return 'Sarthi is getting many questions right now. Please wait a moment, then try again.';
  }

  if (/credit|payment|billing|quota/i.test(message)) {
    return 'Sarthi is temporarily paused because the AI service limit was reached. Please try again later.';
  }

  return 'Sarthi could not complete this answer. Please try again in a moment.';
}

function getClientKey(request: Request) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'anonymous'
  );
}

function isRateLimited(request: Request) {
  const now = Date.now();
  const key = getClientKey(request);
  const bucket = rateLimitBucket.get(key);

  if (!bucket || bucket.resetAt <= now) {
    rateLimitBucket.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  bucket.count += 1;
  return bucket.count > RATE_LIMIT_MAX_REQUESTS;
}

export async function POST(request: Request) {
  try {
    if (isRateLimited(request)) {
      return new Response('Too many assistant requests. Please wait a moment.', {
        status: 429,
      });
    }

    ensureGatewayEnv();

    const { messages } = chatSchema.parse(await request.json());
    const recentMessages = messages.slice(-MAX_MESSAGES);
    const latestUserMessage = [...recentMessages].reverse().find((message) => message.role === 'user');
    const latestUserText = latestUserMessage ? getTextFromMessage(latestUserMessage) : '';

    if (!latestUserText) {
      return new Response('Missing user message.', { status: 400 });
    }

    const boundedUserText = latestUserText.slice(0, MAX_USER_TEXT_LENGTH);
    let searchResults: CmsSearchResult[] = [];
    let searchFailed = false;

    try {
      searchResults = await searchCmsKnowledge(boundedUserText, 6);
    } catch (error) {
      searchFailed = true;
      console.error('CMS knowledge search failed:', error);
    }

    const result = streamText({
      model: 'alibaba/qwen-3-235b',
      system: buildSystemPrompt(buildContext(searchResults, searchFailed)),
      messages: await convertToModelMessages(recentMessages),
      temperature: 0.25,
      maxOutputTokens: 520,
      maxRetries: 0,
      providerOptions: {
        gateway: {
          models: ['alibaba/qwen-3-14b', 'amazon/nova-micro'],
          tags: ['feature:ngo-assistant'],
        },
      },
    });

    return result.toUIMessageStreamResponse({
      onError: getStreamErrorMessage,
    });
  } catch (error) {
    console.error('Assistant chat route failed:', error);
    return new Response(getStreamErrorMessage(error), { status: 500 });
  }
}
