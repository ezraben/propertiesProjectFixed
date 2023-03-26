import Joi from "joi-browser";

const cardJoiSchema = {
  price: Joi.number().min(400000).max(10000000).required(),
  description: Joi.string().min(10).max(100).required(),
  city: Joi.string().min(2).max(100).required(),
  address: Joi.string().min(7).max(100).required(),
  img: Joi.string().min(10).max(900),
  extraInfo: Joi.string().min(10).max(150).required(),
};

export default cardJoiSchema;
