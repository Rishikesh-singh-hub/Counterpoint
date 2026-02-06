import generateResponse from "../services/genai-service.js";

export const debate =async (req,res) =>{
     try {
    const { ideology, userPrompt } = req.body;

    if (!ideology || !userPrompt) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const response = await generateResponse({
      ideology, 
      userPrompt
    });

    res.status(200).json({ message: response });

  } catch (err) {
    res.status(500).json({ error: "Debate generation failed" });
  }
}