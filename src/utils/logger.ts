import winston from "winston";
import { env } from "../config";

const logger = winston.createLogger({
    level: env.NODE_ENV == "production" ? "Info" : "debug",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({stack: true}),
        winston.format.splat(),
        winston.format.json()
    ),

    defaultMeta: { service : "auth-service"},

    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
        }),

        new winston.transports.File({filename: "error", level: "error"}),
        new winston.transports.File({filename: "combine"})

    ],
})

export default logger;

