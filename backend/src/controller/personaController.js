import { getAllPersona } from "../services/personaService.js";

export const getPersona =async(req,res) =>{

    const allPersona = await getAllPersona();
    console.info(["personaController.js"],"\n",allPersona);
    return res.status(200).json({
        allPersona,
    });

}