import Joi from "joi";
import joi from "joi";


export const userLoginvalidator = (user) => {
    const userValidatorSchema = joi.object({
        Email: Joi.string().email().max(255).required(),
        Password: Joi.string().min(6).max(255).required(),
    });
    return userValidatorSchema.validate(user);
};