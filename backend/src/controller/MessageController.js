import { saveMessage } from "../services/chatService.js";

export const messageController =async (req,res) => {
    try {
        const { message, persona } = req.body;
        if ( !message || !persona) {
            return res.status(500).json({
                error: "Internal Server Error",
            });
        }
        console.info(["MessageController.js"], persona)
        const debRes =await saveMessage(message,persona);
        return res.status(200).json({content:debRes});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal Server Error"});
    }
}