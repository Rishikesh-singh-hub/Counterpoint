import { messages, debates } from "./memoryStore.js";
import {getDebate,getMessage} from "../models/get.models.js"
import generateResponse from "./genai-message-service.js"


// export const startDebate = (userId, persona, topic) => {

//   const debate = getDebate(userId,topic,persona);
 
//   debates.set(debate.id, debate);
//   messages.set(debate.id, []);


//   return debate.id
// }

export const saveMessage = async (content, persona) => {

  const aiRes =await generateResponse(persona,content);  

  return aiRes;

}

