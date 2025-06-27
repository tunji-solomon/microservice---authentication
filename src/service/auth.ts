import { AuthRepo, RefreshTokenRepo } from "../repositories";
import { Response } from "express";
import { logger } from "../utils";
import { Tools } from "../utils";

class AuthService {

    private readonly authRepo: any;
    private readonly refreshTokenRepo: any

    constructor(){
        this.authRepo = new AuthRepo();
        this.refreshTokenRepo = new RefreshTokenRepo()
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

    async login (payload: any, res: Response): Promise<object> {

        const { username, password } = payload;
        // get user details by username
        const user = await this.authRepo.getUserPassword(username);
        if(!user) {
            logger.warn("Username does not exist")
            return res.status(404).json({
            status: "Failed",
            message: "User with username does not exist"
            })
        }
        // compare password supplied
        const comparePassword = await Tools.comparePassword(password, user.password);
        if(!comparePassword) {
            logger.warn("Incorrect password provided")
            return res.status(400).json({
                status: "Failed",
                message: "Incorrect password provided"
            })
        }
        // generate access token and refresh token
        const {accessToken, refreshToken, expiresAt } = Tools.generateTokens(
            {
                id: user.id,
                username: user.username,
                email: user.email
            },
            "1hr"
        )
        //check for existing refresh token and delete
        const existingRefreshToken = await this.refreshTokenRepo.findOne(user.id)
        if (existingRefreshToken){
            await this.refreshTokenRepo.deleteOne(existingRefreshToken.id)
        }

        // save new refresh token in the database
        await this.refreshTokenRepo.create( {
            refreshToken,
            expiresAt,
            user: user.id
        })

        logger.info("User login successfully")
        // return tokens to client
        return res.status(200).json({
            status: "Success",
            message: "Login successful",
            accessToken,
            refreshToken
        })
    }

    async updateUser (payload: any, res: Response): Promise<object> {

        const { username, email } = payload

        const { id } = res.locals

        const user = await this.authRepo.findById(id);

        const updatedUser = await this.authRepo.updateOne(id,{
            username: username || user.username,
            email: email || user.email
        })

        logger.info("User records updated successfully")
        return res.status(201).json({
            status:"Success",
            message: "User records updated",
            updatedUser
        })
    }
}

export default new AuthService();