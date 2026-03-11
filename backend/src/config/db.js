import mongoose from "mongoose";
import logger from "../config/logger.js"

const connectDb = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            autoIndex: true
        });
        logger.info(`[db.js] db name: ${mongoose.connection.name}`)
        logger.info(`[db.js]  connected to mongodb`);
    }catch(err){
        logger.error(`[db.js]  unable to connect to mongo db: \n \n${err} \n`);
        process.exit(1)
    }

}

export default connectDb;