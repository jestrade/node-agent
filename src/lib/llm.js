import OpenAI from "openai";

import { config } from "../config/index.js";

const client = new OpenAI({ apiKey: config.llm.apiKey });

export async function generateMessage({ purpose, context }) {
  const system = `Eres un asistente conciso, persuasivo, y útil. Escribe mensajes cortos en español, tono profesional cercano.`;
  const userPrompt = `
Objetivo: ${purpose}
Contexto: ${JSON.stringify(context || {})}

Escribe:
- Asunto (subject) máximo 8 palabras.
- Mensaje de 1-3 líneas (máx 200 caracteres).
- CTA pequeño al final (ej: "Publica ahora", "Ver sugerencia").
Devuélvelo en JSON con claves: subject, body, cta.
`;
  const resp = await client.responses.create({
    model: "gpt-4o-mini", // o el que uses en tu cuenta
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
    return { subject: text.split("\n")[0].slice(0, 60), body: text.slice(0, 200), cta: "Ver" };
  }
}
