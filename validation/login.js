const Joi = require('joi');

const EMAIL_REGEX = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
const USER_REGEX = /^[A-z][A-z0-9-_\s]{3,20}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const login = (inputs) => {
    const schema = Joi.object({
        email: Joi.string()
            .email()
            .min(6)
            .max(128)
            .required(),

        password: Joi.string().pattern(new RegExp(PWD_REGEX)).min(8).max(24).required()
    });
    
    const {error} = schema.validate(inputs);
    
    return error;
}

const register = (input) => {
    
    const schema = Joi.object({
        email: Joi.string().pattern(new RegExp(EMAIL_REGEX)).min(3).max(128).required(),
        name: Joi.string().pattern(new RegExp(USER_REGEX)).min(3).max(20).required(),
        password: Joi.string().pattern(new RegExp(PWD_REGEX)).min(8).max(24).required(),
        role: Joi.number().min(1).max(2).required()
    });
    const {error} = schema.validate(input);
    return error;
}
module.exports = {login, register};