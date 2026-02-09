import express from "express";
import {debateController} from "../controller/DebateController.js";
import { messageController } from "../controller/MessageController.js";


const router = express.Router();

console.info("chat router activated...")

router.post("/msg",messageController);
// router.post("/deb",debateController);

export default router;