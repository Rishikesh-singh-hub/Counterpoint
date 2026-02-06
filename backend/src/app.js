import express from "express";
import userRoutes from "./routes/user.routes.js"
import {errorHandler} from "./middlewares/error.middleware.js";
import authRoutes from "./routes/testing.routes.js"
import chatRouter from "./routes/ai-chat-routes.js"

const app = express();
app.use(express.json());

app.use("/auth",authRoutes);

app.use("/bot",chatRouter);

app.use("/users",userRoutes);


app.use(errorHandler)

export default app;