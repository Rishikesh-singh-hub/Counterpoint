import { saveMessage } from "../services/chatService.js";
import logger from "../utils/logger.js"

export const messageController = async (req, res) => {
    try {

        const { message, persona} = req.body;
        if (!message || !persona) {
            throw new Error("Internal_Server_Error");   
        }

        
        const debRes = await saveMessage (message,persona,req)
        return res.status(200).json({content:debRes})


    }catch (err) {
            logger.info(err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
}


// const { debateId, message, role } = req.body;
//             if (!debateId || !message || !role) {
//                 return res.status(500).json({
//                     error: "Internal Server Error",
//                 });
//             }
//             console.info(["MessageController.js"], persona)
//             const debRes = await saveMessage(message, persona,id);
//             return res.status(200).json({ content: debRes });
