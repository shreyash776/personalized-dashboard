import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash-001",
  apiKey: process.env.GOOGLE_API_KEY,
  temperature: 0.2,
  maxRetries: 3,
});

function cleanMarkdownResponse(content: string): string {
  if (!content) return "";

  // Remove ```json or ``` and ending ```
  const cleaned = content
    .replace(/```(?:json)?/gi, '')  // Remove ```json or ``` (case-insensitive)
    .replace(/```/g, '')            // Remove any remaining ```
    .trim();

  return cleaned;
}



function extractTextContent(res: any): string {
  if (!res) return "";
  if (typeof res === "string") return res.trim();
  if (typeof res.content === "string") return res.content.trim();
  if (Array.isArray(res)) return res.map(extractTextContent).join("\n").trim();
  if (Array.isArray(res.content)) return res.content.map(extractTextContent).join("\n").trim();
  return JSON.stringify(res);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const userInput = body.userInput;
    if (!userInput || typeof userInput !== "string" || !userInput.trim()) {
      return new Response(
        JSON.stringify({ error: "Missing or invalid userInput" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const newsCategories = [
      "technology",
      "business",
      "sports",
      "science",
      "health",
      "entertainment",
    ];
    const musicGenres = [
      "pop",
      "rock",
      "hip-hop",
      "jazz",
      "electronic",
      "classical",
      "country",
      "r&b",
      "metal",
      "reggae",
    ];
    const movieGenres = [
      "Action",
      "Adventure",
      "Animation",
      "Comedy",
      "Crime",
      "Documentary",
      "Drama",
      "Family",
      "Fantasy",
      "History",
      "Horror",
      "Music",
      "Mystery",
      "Romance",
      "Science Fiction",
      "TV Movie",
      "Thriller",
      "War",
      "Western",
    ];

    const prompt = `
You are a helpful assistant that categorizes user preferences into predefined categories for news, movies, and music.

User's input: """${userInput}"""

Respond ONLY with a JSON object with keys "news", "movies", and "music":
- "news": array of categories from [${newsCategories.join(", ")}]
- "movies": array of movie genres (name strings) from [${movieGenres.join(", ")}]
- "music": array of genres from [${musicGenres.join(", ")}]

Only include a category if it is clearly or strongly implied by the user input. Avoid guessing or including categories not supported by the input.

If no categories fit, return empty arrays for that key.

Example 1:
Input: "I love watching scary movies and listening to metal music."
Output:
{
  "news": [],
  "movies": ["Horror"],
  "music": ["metal"]
}

Example 2:
Input: "I'm interested in tech news and upbeat pop songs."
Output:
{
  "news": ["technology"],
  "movies": [],
  "music": ["pop"]
}

Respond strictly ONLY with the JSON, no explanations or markdown.
`.trim();

    const llmResponse = await llm.invoke(prompt);
    const textContent = extractTextContent(llmResponse);
    const cleaned = cleanMarkdownResponse(textContent);
    const result = JSON.parse(cleaned);

    if (
      !result ||
      typeof result !== "object" ||
      !Array.isArray(result.news) ||
      !Array.isArray(result.movies) ||
      !Array.isArray(result.music)
    ) {
      return new Response(
        JSON.stringify({ error: "Invalid response format from LLM" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Gemini inference error:", error);
    return new Response(JSON.stringify({ error: "Failed to infer preferences" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
