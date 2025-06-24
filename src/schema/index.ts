import Joi from "joi";

export const registerSchema = (payload: any) => {
    const registrationSchema: Joi.ObjectSchema = Joi.object({
        username: Joi.string().required().min(6).max(20),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(6).max(20),
        confirm: Joi.ref("password")

    }).with("password", "confirm")

    return registrationSchema.validate(payload)
}
