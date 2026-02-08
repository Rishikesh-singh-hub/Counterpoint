import { messages, debates } from "./memoryStore.js";
import {getDebate,getMessage} from "../models/get.models.js"
import generateResponse from "./genai-message-service.js"


export const startDebate = (userId, persona, topic) => {

  const debate = getDebate(userId,topic,persona);
 
  debates.set(debate.id, debate);
  messages.set(debate.id, []);


  return debate.id
}

export const saveMessage = async (debateId, content, role) => {
  const debate = debates.get(debateId);
  if (!debate) {
    return res.status(400).json({ error: "debateId is required" });
  }

  const message = getMessage(debateId,role,content)
  console.log(debate.persona);
  const aiRes =await generateResponse(debate.persona,content);  

  if (!messages.has(debateId)) {
    messages.set(debateId, []);
  }

  messages.get(debateId).push(message);
  return aiRes;

}

