import { NextFunction, Request, Response } from 'express'
import { Tools } from '../utils'
import {TokenExpiredError} from 'jsonwebtoken'

const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any>=> {

    try {

        const token = await Tools.checkToken(req);
        if(!token) {
            return res.status(400).json({
                status: "Failed",
                message: "No token in header"
            })
        }
        const tokenValid = Tools.verifyToken(token);

        res.locals = tokenValid;

        next()
    
    } catch (error: any) {
        if(error instanceof(TokenExpiredError)) {
            return res.status(400).json({
                status: "Failed",
                message: "Token has expired"
            })
        }
        return res.status(400).json({
            status: "Failed",
            message: "Invalid token",
            badToken: true
        })
        
    }
}

export {
    authMiddleware
}