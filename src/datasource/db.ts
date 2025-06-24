import mongoose from "mongoose";
import { env } from "../config";
import { logger } from "../utils";

const connectDb = async () => {

    try {
        await mongoose.connect(env.DB_URL as string);
        logger.info("Database connected")

    } catch (error) {
        logger.error(`Error connecting to database, ${error}`)  
        process.exit(1);
    }
}

export default connectDb;


