import Joi from "joi-browser";

const recoverPasswordSchema = {
  password: Joi.string()
    .min(6)
    .max(1024)
    .required()
    .regex(
      new RegExp(
        "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*() ]).{6,12}$"
      )
    ),

  confirmPassword: Joi.string()
    .min(6)
    .max(1024)
    .required()
    .regex(
      new RegExp(
        "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*() ]).{6,12}$"
      )
    ),
};

export default recoverPasswordSchema;
