import { connectDb } from "./datasource";
import express, { Express, NextFunction} from "express";
import { env } from "./config";
import router  from './routes';
import { logger } from "./utils";

const app : Express = express();
const PORT : Number = Number(env.PORT)  || 2000;

// Database connection
(async () => {

    await connectDb()
    app.listen(PORT, (err) => {

    if(err) {
        logger.error("Error starting server", err)
    }
    logger.info(`App is running on port: ${PORT}`)
})
})()

app.use((req: any,res: any, next: NextFunction) => {
    logger.info(`${req.method}: ${req.url} -> ${new Date()}`);
    next()
})
// Home url
app.get("/api/v1", (req: any, res: any) => {
    res.status(200).json({
        status: "Sucess",
        message: "Welcome to our homepage"
    })
})

app.use(express.json());
app.use("/api/v1/auth", router);









// const message: String = "Hello from typescript, welcome to todays activity"
// console.log(message)