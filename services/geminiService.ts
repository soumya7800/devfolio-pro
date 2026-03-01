import { GoogleGenAI } from "@google/genai";
import { RESUME_CONTEXT } from '../constants';

let aiClient: GoogleGenAI | null = null;

// @ts-ignore
const API_KEY = process.env.GEMINI_API_KEY || process.env.API_KEY;

export const initializeGemini = (apiKey: string) => {
  aiClient = new GoogleGenAI({ apiKey });
};

export const isConfigured = (): boolean => {
  return !!API_KEY && API_KEY !== 'PLACEHOLDER_API_KEY';
};

export const chatWithResume = async (userMessage: string): Promise<string> => {
  const apiKey = API_KEY;

  if (!apiKey || apiKey === 'PLACEHOLDER_API_KEY') {
    return "I'm currently offline. My system requires a valid GEMINI_API_KEY in the .env.local file to function.";
  }

  if (!aiClient && apiKey) {
    aiClient = new GoogleGenAI({ apiKey });
  }

  if (!aiClient) {
    console.warn("Gemini Client initialization failed.");
    return "System initialization error. Please try again later.";
  }

  try {
    const model = 'gemini-1.5-flash';
    const systemInstruction = `
      You are Soumya's virtual portfolio assistant, an intelligent and friendly AI.
      Your goal is to showcase Soumya's skills, experience, and projects to recruiters, developers, and visitors.

      **Context about Soumya:**
      ${RESUME_CONTEXT}

      **Your Persona:**
      - Tone: Professional yet approachable, enthusiastic, and confident.
      - Style: Concise but informative. Use formatting (bullet points) if helpful.
      - Behavioral: You act as a seamless bridge between the visitor and Soumya.

      **Guidelines:**
      1. Always prioritize highlighting Soumya's strengths (Java, Spring Boot, Scalable Systems).
      2. If asked about contact info, provide his email or LinkedIn from the context.
      3. If asked something not in the context, politely say: "I don't have that specific detail, but I can tell you about his expertise in [Skill] or his project [Project Name]!"
      4. Keep responses short and engaging (max 3-4 sentences unless explaining a technical concept).
    `;

    const response = await aiClient.models.generateContent({
      model: model,
      contents: [
        {
          role: 'user',
          parts: [{ text: userMessage }]
        }
      ],
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "I couldn't generate a response at the moment.";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "Sorry, I'm having trouble connecting to the neural network right now.";
  }
};