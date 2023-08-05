import Joi from "joi";

const loginUserValidator = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
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

export default loginUserValidator;
