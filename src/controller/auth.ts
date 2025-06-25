import { Request, Response } from "express";
import { logger } from "../utils";
import { registerSchema } from "../schema";
import { AuthService } from "../service";

export const register = async (req: Request, res: Response): Promise<any> => {

    try {

        const { error } = registerSchema(req.body)
        if(error){
            return res.status(400).json({
                status: "Failed",
                message: error.details[0].context?.label == "confirm" ?
                        "Password and confirm password missmatch" : 
                        error.details[0].message
            })
        }
        const register = await AuthService.register(req.body, res) 
        return register;
    } catch (error) {
        logger.error("Something went wrong", error)
        return res.status(400).json({
            status: "Failed",
            message: "Something went wrong, Try again later"
        })
    }
}

export const login = async (req: Request, res: Response): Promise<any> => {

    try {

        const login = await AuthService.login(req.body, res) 
        return login;
    } catch (error) {
        logger.error("Something went wrong", error)
        return res.status(400).json({
            status: "Failed",
            message: "Something went wrong, Try again later"
        })
    }
}

export const update = async (req: Request, res: Response): Promise<any> => {

    try {

        const update = await AuthService.updateUser(req.body, res) 
        return update;
    } catch (error) {
        logger.error("Something went wrong", error)
        return res.status(400).json({
            status: "Failed",
            message: "Something went wrong, Try again later"
        })
    }
}