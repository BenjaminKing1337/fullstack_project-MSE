//joi import
const Joi = require('joi');
//jsonwebtoken import
const Jwt = require('jsonwebtoken');
// Register Validation
const RegisterValidation = (data) => {
    delete data.pass_confirm;
    const Schema = Joi.object(
        {
            email: Joi.string().min(6).max(255).required(),
            password: Joi.string().min(6).max(255),
        });
        return Schema.validate(data);
    }    
// Login Validation
const LoginValidation = (data) => {
    const Schema = Joi.object(
        {
            email: Joi.string().min(6).max(255).required(),
            password: Joi.string().min(6).max(255).required(),
        });
    return Schema.validate(data);
}
// logic to verify our token (JWT)
const VerifyToken = (req, res, next) => {
    const Token = req.header("auth-token");

    if (!Token) return res.status(401).json({ error: "Access Denied" });

    try {
        const verified = Jwt.verify(Token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }
    catch (error) {
        res.status(400).json({ error: "Token is not valid" });
    }
}
// modular exportation
module.exports = { RegisterValidation, LoginValidation, VerifyToken };