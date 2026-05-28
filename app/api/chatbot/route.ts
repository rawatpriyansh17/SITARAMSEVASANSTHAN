import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
const fs = require("fs");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not set in environment variables.");
}

// Initialize OpenAI client with Gemini endpoint
const client = new OpenAI({
  apiKey: GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

// Read site summary for context
let siteContext = "";
try {
  siteContext = fs.readFileSync("site-summary.md", "utf8");
} catch (error) {
  console.error("Error reading site-summary.md:", error);
}

const systemInstruction = `You are a helpful, knowledgeable assistant for the Sitaram Seva Sansthan NGO website. Use the provided website content (from the latest site-summary.md) to answer all questions from visitors and donors about the NGO, its mission, services, events, donation process, and contact details.

General NGO Info:
Sitaram Seva Sansthan is dedicated to supporting women battling cancer, especially breast and ovarian cancer. The NGO's philosophy is "Seva Se Samadhan" (Solution through Service). The organization provides care, support, and resources to empower women and improve their quality of life. Key activities include free distribution of original silicone breasts, free chemotherapy medicines, awareness programs, blood donation camps, and support for students in government schools. Donations can be made via UPI QR code on the Donate page. Contact: sansthansitaramseva@gmail.com, +91 9111311301, Indore, Madhya Pradesh, India. Support is available in English and Hindi.

Instructions:
- Always use the information from the site-summary.md to answer questions but don't tell the user that you are using a site-summary.md file ,intead tell them thatyou have all access to the data given on the site.
- If you do not know the answer or the information is not available, politely inform the user.
- Be clear, concise, and supportive in your responses.

Website Content for Reference:
${siteContext}`;

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    if (!message) {
      return NextResponse.json({ error: "No message provided." }, { status: 400 });
    }

    const stream = await client.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        { role: "system", content: systemInstruction },
        { role: "user", content: message }
      ],
      max_tokens: 1000,
      temperature: 0.7,
      stream: true
    });

    // Create a readable stream for the response
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              const data = `data: ${JSON.stringify({ content })}\n\n`;
              controller.enqueue(encoder.encode(data));
            }
          }
          // Send end signal
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (error) {
          console.error("Streaming error:", error);
          controller.error(error);
        }
      }
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error: any) {
    console.error("Chatbot API error:", error);
    return NextResponse.json({ error: error.message || "Unknown error" }, { status: 500 });
  }
}


