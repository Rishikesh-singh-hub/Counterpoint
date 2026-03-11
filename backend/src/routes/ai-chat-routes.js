import express from "express";
import { messageController } from "../controller/MessageController.js";


const router = express.Router();

router.post("/msg",messageController);

export default router;