import express from "express";
import {debate} from "../controller/genai-controller.js";

const router = express.Router();

router.post("/chat",debate);

export default router;