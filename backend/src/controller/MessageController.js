import { saveMessage } from "../services/chatService.js";

export const messageController =async (req,res) => {
    try {
        const { debateId, message, role } = req.body;
        if (!debateId || !message || !role) {
            return res.status(500).json({
                error: "Internal Server Error",
            });
        }
        const debRes =await saveMessage(debateId.Id,message,role);
        return res.status(200).json({content:debRes});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal Server Error"});
    }
}
