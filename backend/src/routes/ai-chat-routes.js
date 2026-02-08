import express from "express";
import {debateController} from "../controller/DebateController.js";
import { messageController } from "../controller/MessageController.js";


const router = express.Router();

router.post("/msg",messageController);
router.post("/deb",debateController);

export default router;