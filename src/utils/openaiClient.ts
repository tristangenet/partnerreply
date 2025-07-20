import { OpenAI } from "openai";

export function getOpenAI(apiKey: string) {
  return new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true, // obligatoire côté frontend
  });
}
