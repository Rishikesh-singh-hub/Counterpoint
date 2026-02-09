// import { startDebate } from "../services/chatService.js";

export const debateController = (req,res) => {
    try {
        const { topic, persona } = req.body;
        if (!topic || !persona) {
            return res.status(400).json({
                error: "Topic and persona are required",
            });

        }
        const debateId = startDebate(req.user.id,persona,topic)
        return res.status(200).json({Id:debateId});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal Server Error"});
    }
}