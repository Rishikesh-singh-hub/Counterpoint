import express from "express";
import {authenticate} from "../middlewares/auth-middleware.js";

const router = express.Router();

router.get("/test",authenticate,(req,res)=>{
    res.status(200).json({
        message:"true",
        user:req.user
    });
});

export default router;