# Sitaram Seva Sansthan Public Website

Public website for **Sitaram Seva Sansthan**, an NGO based in Indore working around cancer support, awareness, donation drives, health camps, and community service.

This repository contains the public-facing application deployed for `sitaramsevasansthan.org`. It is paired with a separate CMS project, `ngocms`, which owns the content database, media uploads, and AI knowledge embeddings.

> Status: private/portfolio project maintained by a solo developer for Sitaram Seva Sansthan. This is not currently an open-source contribution project.

## What This App Does

- Presents the NGO's public website with home, about, donation, upcoming program, and event detail pages.
- Fetches posts, events, event media, and latest upcoming program data from the separate CMS backend.
- Supports Hindi static UI translations through General Translation.
- Translates CMS-driven content at runtime with safe fallbacks to English.
- Handles online donations through Razorpay and stores payment records in a separate Turso database.
- Provides QR and bank transfer donation options alongside Razorpay checkout.
- Includes **Sarthi**, a floating AI assistant that answers site, donation, program, and navigation questions using CMS-owned RAG search.
- Uses responsive, motion-rich UI patterns optimized for mobile and desktop visitors.

## Tech Stack

| Area | Technologies |
| --- | --- |
| Framework | Next.js 16 App Router, React 19, TypeScript |
| Styling | Tailwind CSS 4, shadcn/Radix UI, custom CSS, responsive layouts |
| Animation | Motion for React, animated beams, progress navigation, micro-interactions |
| CMS Integration | Server-side fetches from `ngocms` public API with revalidation |
| Media | ImageKit, optimized image rendering, video thumbnails |
| Payments | Razorpay Orders API, signature verification, Turso payment records |
| Database | Turso/libSQL + Drizzle ORM for donation/payment data |
| AI Assistant | Vercel AI SDK, AI Gateway, Streamdown, shadcn chat primitives |
| RAG Search | Calls protected `ngocms` AI search endpoint backed by Turso vector embeddings |
| i18n | General Translation (`gt-next`, `gt`) with checked-in Hindi static catalog |
| Validation | Zod, API-side request validation |
| Tooling | ESLint, TypeScript, Turbopack dev server |

## System Architecture

```txt
Visitor
  |
  v
NGOCODE public website
  |-- fetches CMS content --> ngocms public API
  |                          |
  |                          v
  |                       CMS Turso DB + ImageKit URLs
  |
  |-- donation checkout --> Razorpay
  |                          |
  |                          v
  |                       NGOCODE Turso payments DB
  |
  |-- Sarthi chat API --> ngocms protected AI search
                             |
                             v
                          CMS embeddings + AI Gateway
```

The two apps are intentionally separated:

- `NGOCODE` owns the public visitor experience, donation checkout, and payment storage.
- `ngocms` owns editable website content, content APIs, ImageKit upload flow, and vector search for the assistant.

This keeps the donation database independent from the CMS content database and allows the dashboard to be deployed separately at `dashboard.sitaramsevasansthan.org`.

## Key Features

### Content-Driven Public Pages

- Homepage sections are populated from CMS posts with server-side pagination.
- Individual event pages render CMS-managed event text, photos, videos, interviews, and distribution media.
- The latest-event page shows a CMS-managed upcoming program flyer, with a polished empty state when no event is active.
- Content requests use a 60-second revalidation window so CMS changes become visible quickly without forcing every request to hit the dashboard server.

### Donation Experience

- Razorpay order creation and payment verification are handled through App Router API routes.
- Payment records include amount, donor details, anonymous donation state, Razorpay IDs, verification status, failure reason, and timestamps.
- Donation page includes online payment, QR code, and bank transfer sections.
- Form UX includes floating inputs, validation, anonymous donation support, responsive separators, and toast-based payment status feedback.

### Sarthi AI Assistant

Sarthi is a website assistant designed for non-technical visitors. It can:

- Answer questions about programs, donations, contact details, and navigation.
- Use CMS search results from `ngocms` embeddings for post and event questions.
- Fall back to verified site facts for critical information like donation links and contact details.
- Reply in the user's language when possible, including English, Hindi, and Hinglish.
- Guide users to the donate page without processing payments directly inside chat.

Important design choices:

- Chat history is not stored in this app.
- User messages are bounded for cost and safety.
- The API route has simple request rate limiting.
- AI failures and rate-limit responses are converted into user-friendly messages.
- The prompt explicitly prevents fake routes such as `/events` and only uses real page URLs.

### Translation Strategy

- Static interface text is wrapped with General Translation and compiled into `public/_gt/hi.json`.
- The checked-in Hindi catalog avoids spending translation quota on every production build.
- CMS content remains stored in English in the CMS.
- Runtime translation helpers are used selectively for CMS text, with English fallback if translation fails.
- Small interactive strings in Sarthi use a local locale-aware copy map to avoid runtime `gt()` errors.

### Performance and UX Work

- Server components fetch public CMS data with revalidation.
- Post skeleton loaders are animated and reusable through a playground route.
- Images use fallbacks to avoid broken empty `src` values.
- Motion is implemented through React components instead of Tailwind motion utility classes.
- Navigation uses a progress bar link pattern for smoother route transitions.
- Mobile layouts were tuned separately for header, carousel, donation, services, footer, and chat widget.

## Project Structure

```txt
app/
  api/
    chat/                 Sarthi streaming chat API
    create-order/         Razorpay order creation
    verify-payment/       Razorpay signature verification
    payment-failed/       Failed payment persistence
  components/
    ai-assistant.tsx      Floating Sarthi assistant
    donate-checkout.tsx   Razorpay donation form
    PostSection.tsx       Server-side post fetch + translation boundary
    PostList.tsx          Client post masonry/list rendering
    Services.tsx          Animated services section
    Header.tsx            Responsive header/navigation/language switcher
  donate/
  events/[slug]/
  latest-event/
  about/
db/
  schema.ts               Payment table schema
lib/
  cms-api.ts              Public CMS API client
  cms-ai-search.ts        Protected RAG search client
  razorpay.ts             Razorpay SDK helpers
  translation-helper.ts   Safe runtime CMS translation helper
```

## Environment Variables

The app expects the following environment variables depending on which features are enabled:

```env
# CMS integration
CMS_URL=
NEXT_PUBLIC_CMS_URL=

# AI Gateway / Sarthi
AI_GATEWAY_API_KEY=
CMS_AI_API_SECRET=
CMS_AI_SEARCH_URL=

# Turso payment database
TURSO_CONNECTION_URL=
TURSO_AUTH_TOKEN=

# Razorpay
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
NEXT_PUBLIC_RAZORPAY_KEY_ID=

# ImageKit
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=

# General Translation
GT_API_KEY=
GT_PROJECT_ID=
NEXT_PUBLIC_GT_PROJECT_ID=
```

Do not commit real secrets. Local values should live in `.env.local`.

## Local Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Lint:

```bash
npm run lint
```

Update static translations only when intentionally changing static UI text:

```bash
npm run translate
```

## Static Translation Workflow

Production deploys use the checked-in `public/_gt/hi.json` catalog. This prevents repeated translation quota usage during normal builds.

Recommended workflow:

1. Change static text wrapped in `<T>...</T>`.
2. Run `npm run translate` intentionally.
3. Review the generated `public/_gt/hi.json` and lock/catalog changes.
4. Commit the catalog with the source change.

CMS content is not pretranslated at build time. It is fetched from `ngocms` and handled at runtime with fallbacks.

## Engineering Challenges Solved

- Migrated a hardcoded bilingual site toward a cleaner English-source CMS plus translation layer.
- Separated public website payment storage from CMS content storage.
- Added Razorpay order creation, verification, failure capture, anonymous donations, and user-friendly payment feedback.
- Built a CMS-backed AI assistant without duplicating content into the public app database.
- Managed AI Gateway rate limits with bounded prompts, short outputs, fallback facts, and user-facing error states.
- Tuned responsive layouts for a content-heavy NGO website with many image formats and event layouts.
- Reduced ImageKit bandwidth risk with optimized rendering, image fallbacks, skeleton loaders, and careful media sizing.
- Reworked Tailwind and motion usage after dependency upgrades.

## Resume Highlights

This project demonstrates:

- Full-stack product ownership across frontend, backend, payments, CMS, AI, and deployment architecture.
- Practical system design across two linked Next.js apps.
- Integration with third-party services: Razorpay, ImageKit, Clerk-managed CMS, Turso, AI Gateway, and General Translation.
- Production-minded handling of rate limits, translation quota, fallbacks, auth boundaries, and data ownership.
- UI/UX iteration for real non-technical users rather than a demo-only interface.

## Related Project

The paired CMS lives in `../ngocms`. It manages posts, events, media, latest-event flyers, ImageKit upload authorization, and CMS-owned vector embeddings used by Sarthi.
