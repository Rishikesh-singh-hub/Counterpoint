import Persona from "../schema/personaSchema.js";

export const getAllPersona = async () => {

    const persona = await Persona.find();
    if (!persona) {
        return null
    }
    return persona;
};

export const getPersonaById = async(id) =>{
    console.info("[persona.js]","getting info from db.... \n");
    const persona = await Persona.findById(id);
    if(!persona){
        return null;
    }
    return persona;
}

export const createPersona = async (data) => {


    const persona = new Persona(data);
    const saveData =await persona.save();
    if (!saveData) {
        return null
    }
    console.info(`Data saved ${saveData}`);

    return persona;
}