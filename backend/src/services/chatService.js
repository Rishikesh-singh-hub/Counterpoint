import generateResponse from "./genai-message-service.js"
import {getPersonaById} from "../services/personaService.js"
import getIdeology from "./Ideology.js"
import { addSession } from "./sessionService"
import logger from "../utils/logger.js"
export const saveMessage = async (content, personaId, req) => {

  try{

    const sessionId = req.sessionId;
    logger.info(`${req.user.id}`)

//  -----------what to do first add session and how or start query ?

    const persona = await getPersonaById(personaId);
    const {id,name,description} = persona;
    const Ideology = getIdeology(name,description)

    const aiRes =await generateResponse(Ideology,content); 
    
    if(!sessionId){
      
      addSession(sessionId,req.userId, persona, content, aiRes);
      logger.info(`session saved`);

    }
    


    return aiRes;
  }catch(err){
    console.error(err);
  }


}


const getSession = async (sessionId,) =>{

  if (!sessionId){
    const newSession = await db.collection("sessions").insertOne({
      userId: req.user.id,// how to handle req here ?
      persona: persona,
      topic: "",
      summary:"",
      createdAt: new Date(),
      updatedAt: new Date()
    })

    return newSession;
  }
  return sessionId
  
}

