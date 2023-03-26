import Joi from "joi-browser";

const signUprSchema = {
  firstName: Joi.string().min(2).max(255).trim().alphanum().required(),
  lastName: Joi.string().min(2).max(255).trim().alphanum().required(),
  email: Joi.string().min(5).max(64).email().required(),
  password: Joi.string().min(8).max(1024).required(),
  confirmPassword: Joi.ref("password"),
  phone: Joi.string().min(3).max(20),
  isAdmin: Joi.boolean().required(),
};

export default signUprSchema;
