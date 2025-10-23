import OpenAI from "openai";
import { config } from "../config/index.js";

const client = new OpenAI({ apiKey: config.llm.apiKey });

export async function generateMessage({ purpose, context }) {
  const system = `You are a concise, persuasive, and helpful assistant. Write short messages in English with a professional yet friendly tone.`;
  const userPrompt = `
Objective: ${purpose}
Context: ${JSON.stringify(context || {})}

Write:
- Subject line (maximum 8 words)
- Message body of 1-3 lines (max 200 characters)
- Short CTA at the end (e.g., "Publish now", "View suggestion")
Return in JSON format with keys: subject, body, cta.
`;
  const resp = await client.responses.create({
    model: "gpt-4-mini", // or whichever model you use in your account
    input: [
      { role: "system", content: system },
      { role: "user", content: userPrompt }
    ],
    max_output_tokens: 300,
  });

  const text = resp.output_text ?? resp.output?.[0]?.content?.[0]?.text ?? String(resp);
 
  try {
    const jsonStart = text.indexOf("{");
    const json = JSON.parse(text.slice(jsonStart));
    return json;
  } catch (e) {
    return { 
      subject: text.split("\n")[0].slice(0, 60), 
      body: text.slice(0, 200), 
      cta: "View" 
    };
  }
}