import "./config/env.js";
import app from "./app.js";
import logger from "./utils/logger.js";

const PORT = process.env.PORT || 3030 ;

app.listen(PORT,()=>{
    logger.info(`Server running on port ${PORT}`);
})