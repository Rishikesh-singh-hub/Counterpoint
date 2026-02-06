import {GoogleGenerativeAI} from "@google/generative-ai";

const gen_ai=new GoogleGenerativeAI(process.env.genai_key);

export default gen_ai;