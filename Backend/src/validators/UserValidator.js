import Joi from "joi";

export const userLoginvalidator = (user) => {
    const userValidatorSchema = Joi.object({
        Email: Joi.string().email().max(255).required(),
        Password: Joi.string().min(6).max(255).required(),
    });
    return userValidatorSchema.validate(user);
};