import express from "express";
import userRoutes from "./routes/user.routes.js"
import {errorHandler} from "./middlewares/error.middleware.js";
import authRoutes from "./routes/testing.routes.js"
import chatRouter from "./routes/ai-chat-routes.js"
import {authenticate} from "./middlewares/auth-middleware.js"
import cors from "cors"


const app = express();

app.use(cors({
    origin: "http://localhost:8080",
    credentials: true,
}))

app.use(express.json());

app.use("/auth",authRoutes);

app.use("/bot",authenticate,chatRouter);

app.use("/users",userRoutes);


app.use(errorHandler)

export default app;