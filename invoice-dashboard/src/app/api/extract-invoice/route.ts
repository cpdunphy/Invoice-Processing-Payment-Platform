import { OpenAI } from "openai";
import { NextResponse } from "next/server";

console.log("XXXXXXXXXXXXXXXX PARSING");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { invoiceText } = await req.json();

  const messages: OpenAI.ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: `You are an expert at parsing invoices from OCR text. Always respond with ONLY valid JSON. Extract the following fields:
        - invoice_number (string)
        - transaction_date (string, ISO 8601 format: YYYY-MM-DD)
        - due_date (string, ISO 8601 format)
        - vendor (string)
        - customer (string)
        - total (number)
        - currency (3-letter code, e.g. USD, EUR)

        Do not include any explanations or additional text. Just return clean JSON.`,
    },
    {
      role: "user",
      content: `Here is the raw invoice text:\n\n${invoiceText}\n\nExtract and return the fields listed above.`,
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
