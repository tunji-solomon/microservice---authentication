import bcrypt from "bcryptjs";
import { env } from "../config";

export const hashPassword = async (password: string): Promise<string> => {

    const salt: string = await bcrypt.genSalt(12);

    const hashedPassword: string = await bcrypt.hash(password, salt)

    return hashedPassword

}

