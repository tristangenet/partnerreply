import { OpenAI } from "openai";

export function getOpenAI(apiKey?: string) {
  const key = apiKey || import.meta.env.VITE_OPENAI_API_KEY;
  return new OpenAI({
    apiKey: key,
    dangerouslyAllowBrowser: true, // obligatoire côté frontend
  });
}
