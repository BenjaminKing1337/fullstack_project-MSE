const Joi = require('joi');
const Jwt = require('jsonwebtoken');

// Register Validation
const RegisterValidation = (data) => {
  delete data.pass_confirm;
  const Schema = Joi.object({
    email: Joi.string().min(6).max(255).required(),
    userlevel: Joi.string().valid('user', 'admin', 'superadmin'), // Only accepts these three values
    created_by: Joi.string().min(6).max(255).required(),
    password: Joi.string().min(6).max(255).required(),
  });
  return Schema.validate(data);
};
// Login Validation
const LoginValidation = (data) => {
  const Schema = Joi.object({
    email: Joi.string().min(6).max(255).required(),
    password: Joi.string().min(6).max(255).required(),
  });
  return Schema.validate(data);
};
// logic to verify our token (JWT)
const VerifyToken = (req, res, next) => {
  const Token = req.header('auth-token');

  if (!Token) return res.status(401).json({ error: 'Access Denied' });

  try {
    const verified = Jwt.verify(Token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(498).json({ error: 'Token is not valid' });
  }
};

module.exports = { RegisterValidation, LoginValidation, VerifyToken };
