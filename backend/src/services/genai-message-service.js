import genAi from "../config/genai.js";
import { IDEOLOGY_PROMPTS } from "../controller/ideologies.js";

const generateResponse = async (
  ideology,
  userPrompt,
  temperature = 0.7
) => {
  try {
    if (!IDEOLOGY_PROMPTS[ideology]) {
      throw new Error("INVALID_IDEOLOGY");
    }

    if (typeof userPrompt !== "string") {
      throw new Error("INVALID_USER_PROMPT");
    }

    const model = genAi.getGenerativeModel({
      model: "models/gemini-2.5-flash",

      generationConfig: { temperature }
    });


    const systemPrompt = IDEOLOGY_PROMPTS[ideology];

    const prompt = `${systemPrompt}\n\nUser query:\n${userPrompt}`;

    const aiRes = await model.generateContent(prompt);

    const txtRes = aiRes.response.text();

    if (!txtRes) {
      throw new Error("EMPTY_GEMINI_RESPONSE");
    }

    return txtRes;

  } catch (err) {
    console.error("Gemini error:\n", err);
    throw err;
  }
};




export default generateResponse;
