import admin from "../config/firebase.js";

export async function authenticate(req,res,next){
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(404).json({message:"Unauthorized Access"});
    }

    const token = authHeader.split(" ")[1];
    try{
        const decoded = await admin.auth().verifyIdToken(token);

        req.user = {
            id: decoded.uid,
            email: decoded.email
        };

        next()
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal Server Error"});
    }
}