import { AuthRepo } from "../repositories";
import { Response } from "express";
import { logger } from "../utils";
import { Tools } from "../utils";

class AuthService {

    private readonly authRepo: any;

    constructor(){
        this.authRepo = new AuthRepo();
    }

    async register(payload: any, res: Response): Promise<object> {

        const { username, email, password } = payload;
        
        //check if username exist
        const usernameExist = await this.authRepo.findByParameter(username);
        if (usernameExist) {
           logger.info("Username already exist")
           return  res.status(400).json({
                status: "Failed",
                message : "Username already exist"
        })}
        // check if email exist
        const emailExist = await this.authRepo.findByParameter(email);
        if (emailExist) {
           logger.info("Email already exist")
            return  res.status(400).json({
                status: "Failed",
                message : "Email already exist"
        })}
        //hash password
        payload.password = await Tools.hashPassword(password);

        let user: any = await this.authRepo.register(payload);
        user = user.toJSON()
        delete user.password
        logger.info("New user created successfully")
        return res.status(201).json({
            status: "Success",
            message: "User registration successfully",
            data: user
        })
    }
}

export default new AuthService();