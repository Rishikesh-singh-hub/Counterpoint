import generateResponse from "./genai-message-service.js"
import {getPersonaById} from "../services/personaService.js"
import getIdeology from "./Ideology.js"

export const saveMessage = async (content, personaId) => {

  try{

    const persona = await getPersonaById(personaId);
    
    const {id,name,description} = persona;
    console.info(`[chatService.js] name: ${name} \n desc: ${description}`)
    const Ideology = getIdeology(name,description)
    console.log(`[chatService.js] \n ideology: ${Ideology}`)

    const aiRes =await generateResponse(Ideology,content);  
    return aiRes;
  }catch(err){
    console.error(err);
  }


}

