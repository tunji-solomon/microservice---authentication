import { UserModel } from "../model";

class AuthRepo {

    async register (payload: any): Promise<object> {
        return await UserModel.create(payload)
    }

    async findById (id: string): Promise<any> {
        return await UserModel.findById(id).select("_id username email")
    }

    async findByParameter (parameter: string): Promise<any> {
        return await UserModel.findOne({$or: [{username: parameter}, {email: parameter}]}).select("_id username email")
    }

    async getUserPassword (username: any): Promise<any> {
        return await UserModel.findOne({username})
    }

    async updateOne (payload: any): Promise<any> {
        return await UserModel.findByIdAndUpdate({_id: payload.id}, {username: payload.username, email: payload.email})
    }
}

export default AuthRepo;