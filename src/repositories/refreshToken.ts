import { RefreshToken } from "../model";

class RefreshTokenRepo {

    async create (payload: any) : Promise<object> {

        return await RefreshToken.create(payload)
    }

    async findOne (userId: string): Promise<any> {
        return await RefreshToken.findOne({user:userId})
    }

    async deleteOne (id: string): Promise<any> {
        return await RefreshToken.findByIdAndDelete(id)
    }
}

export default RefreshTokenRepo;