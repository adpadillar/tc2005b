import express from "express";
import { OpenAI } from "openai";
import dotenv from "dotenv";
import { NearbyyClient } from "@nearbyy/core";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const nearbyy = new NearbyyClient({
  API_KEY: process.env.NEARBYY_API_KEY!,
});

function getSystemPrompt(): string {
  return `[SYSTEM]: You are an AI inside of a video game. The player (human)
  is pretending to be a therapist, and you are going to be his expert
  system. This system has a lot of knowledge about mental health and
  psychology, and can generate realistic looking prescriptions based on
  a patient's description. Provided by the player. The system also has
  a database, where it can look up factual information about mental health,
  this information will be available from the system prompt. Help the user
  with any of the queries they have.`;
}

async function getRagContext(
  prompt: string,
  rag: boolean
): Promise<OpenAI.ChatCompletionMessageParam[]> {
  if (!rag)
    return [
      {
        role: "system",
        content:
          "[SYSTEM]: No context from the database was provided for this query",
      },
    ];

  const searchTermAI = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `[SYSTEM]: You are an AI that will be given 
        a prompt and generate a search term that will be sent to
        an external system to retrieve information that may be
        relevant to answering or addressing the user's query. This
        external system uses semantic search to find relevant information.
        Generate a detailed search term based on the user's prompt.`,
      },
      { role: "user", content: prompt },
    ],
  });

  const searchTerm = searchTermAI.choices[0].message.content!;

  const ctx = await nearbyy.semanticSearch({
    limit: 5,
    query: searchTerm,
  });

  if (!ctx.success) {
    return [
      {
        role: "system",
        content:
          "[SYSTEM]: No context from the database was provided for this query",
      },
    ];
  }

  const ctxMessage = ctx.data.items
    .map((chunk) => `ChunkId: ${chunk.chunkId} - ${chunk.text}`)
    .join("\n\n");

  return [
    {
      role: "system",
      content: `[SYSTEM]: Context from the database: ${ctxMessage}`,
    },
  ];
}

export const chatRouter = express.Router();

chatRouter.post("/", async (req, res) => {
  const { prompt, rag } = req.body;

  if (!prompt) {
    return res.status(400).send("Prompt is required");
  }

  const ctx = await getRagContext(prompt, rag);

  console.log(ctx);

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: getSystemPrompt() },
      {
        role: "system",
        content:
          "[SYSTEM]: Output format will be plain text. Output will not be rendered as HTML or markdown.",
      },
      ...ctx,
      { role: "user", content: prompt },
    ],
  });

  const text = response.choices[0].message.content;

  if (!text) {
    return res.status(500).send("Error generating response");
  }

  return res.json({ answer: text });
});
