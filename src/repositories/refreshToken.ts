import { RefreshToken } from "../model";

class RefreshTokenRepo {

    async create (payload: any) : Promise<object> {

        return await RefreshToken.create(payload)
    }
}

export default RefreshTokenRepo;