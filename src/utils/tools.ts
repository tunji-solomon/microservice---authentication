import bcrypt from "bcryptjs";
import { env } from "../config";
import jwt from "jsonwebtoken"
import logger from "./logger";
import crypto from 'crypto'

export const hashPassword = async (password: string): Promise<string> => {

    const salt: string = await bcrypt.genSalt(12);

    const hashedPassword: string = await bcrypt.hash(password, salt)

    return hashedPassword

}

export const comparePassword = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(plainPassword, hashedPassword)
}

export const generateTokens = (payload: any, time: any) : any => {
    const accessToken = jwt.sign(payload, String(env.JWT_SECRET), { expiresIn : time})

    const refreshToken = crypto.randomBytes(50).toString("hex")
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 5)

    const tokens = {
        accessToken,
        refreshToken,
        expiresAt
    }

    return tokens

}

export const checkToken = (req: any) : any => {

    const header = req.headers?.authorization
    if(header&& header.split(" ")[0] == "Bearer"){
        const token: string = header.split(" ")[1]
        return token
    }

    return null
}

export const verifyToken = (token: string): any => {
    return jwt.verify(token, String(env.JWT_SECRET))
}



