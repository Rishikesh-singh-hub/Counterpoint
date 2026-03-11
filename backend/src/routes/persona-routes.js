import express from "express";
import { getPersona } from "../controller/personaController.js";

const route = express.Router();

route.get("/",getPersona);

export default route;