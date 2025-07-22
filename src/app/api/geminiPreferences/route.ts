

import { NextApiRequest, NextApiResponse } from "next";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash-001",
  apiKey: process.env.GOOGLE_API_KEY,
  temperature: 0.2,
  maxRetries: 3,
});


function cleanMarkdownResponse(content: string): string {
  if (!content) return "";

  let cleaned = content.replace(/^``````$/gm, "");
  try {
    cleaned = JSON.parse(`"${cleaned.replace(/"/g, '\\"')}"`);
  } catch {
    cleaned = cleaned.replace(/\\n/g, "\n");
  }
  return cleaned.trim();
}

function extractTextContent(res: any): string {
  if (!res) return "";
  if (typeof res === "string") return res.trim();
  if (typeof res.content === "string") return res.content.trim();
  if (Array.isArray(res)) return res.map(extractTextContent).join("\n").trim();
  if (Array.isArray(res.content)) return res.content.map(extractTextContent).join("\n").trim();
  return JSON.stringify(res);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  const { userInput } = req.body;
  if (!userInput) {
    return res.status(400).json({ error: "Missing userInput" });
  }

 
  const newsCategories = ['technology', 'business', 'sports', 'science', 'health', 'entertainment'];
  const musicGenres = ['pop', 'rock', 'hip-hop', 'jazz', 'electronic', 'classical', 'country', 'r&b', 'metal', 'reggae'];

  const prompt = `
You are a helpful assistant that categorizes user preferences into predefined categories for news, movies, and music.

User's input: """${userInput}"""

Respond with a JSON object ONLY. The object must have three keys: "news", "movies", "music".

- The "news" value should be an array containing any relevant categories from the list: [${newsCategories.join(", ")}].
- The "movies" value should be an array of movie genres (name strings).
- The "music" value should be an array containing any relevant genres from the list: [${musicGenres.join(", ")}].

Include ONLY those categories the user input clearly implies or mentions. Return empty arrays if none.

Example output format:
{
  "news": ["sports", "business"],
  "movies": ["comedy", "action"],
  "music": ["pop", "rock"]
}

Respond STRICTLY with the JSON object ONLY, no commentary or markdown.
`.trim();

  try {
    const llmResponse = await llm.invoke(prompt);
    console.log("Gemini raw response:", JSON.stringify(llmResponse, null, 2));
    
    const textContent = extractTextContent(llmResponse);
    const cleaned = cleanMarkdownResponse(textContent);

    
    const result = JSON.parse(cleaned);

    return res.status(200).json(result);
  } catch (error) {
    console.error("Gemini inference error", error);
    return res.status(500).json({ error: "Failed to infer preferences" });
  }
}
