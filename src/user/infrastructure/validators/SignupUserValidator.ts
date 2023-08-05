import Joi from "joi";

const signupUserValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .max(30)
    .pattern(
      new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+\\-=[\\]{};:'\\\",./<>?|]).{8,}$"
      )
    )
    .required(),
});

export default signupUserValidator;
