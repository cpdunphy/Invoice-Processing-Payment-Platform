import { OpenAI } from "openai";
import { NextResponse } from "next/server";

console.log("XXXXXXXXXXXXXXXX PARSING")
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { invoiceText } = await req.json();

  const messages: OpenAI.ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: `You are an expert invoice parser. Given raw text extracted from a scanned or OCR'd invoice, return key details in JSON. Always respond with only valid JSON. Always give it on a neat list.`,
    },
    {
      role: "user",
      content: `Here is the invoice text:\n\n${invoiceText}\n\nExtract and return key fields like transaction_date (ISO format), invoice_number, vendor, total (as number), currency, and due_date (ISO format).`,
    },
  ];

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: messages,
    temperature: 0.25,
    response_format: { type: "json_object" },
    max_tokens: 100,
  });

  const data = response.choices[0].message?.content;

  return NextResponse.json(JSON.parse(data || "{}"));
}
