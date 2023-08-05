import Joi from "joi";

const loginGoogleUserValidator = Joi.object({
  email: Joi.string().email().required(),
  id: Joi.string().required().regex(/^\d+$/),
  name: Joi.string(),
  photo: Joi.string(),
});

export default loginGoogleUserValidator;
