import Joi from "joi";

const translateMediaValidator = Joi.object({
  outputLang: Joi.string().valid("en-US", "fr-FR", "es-ES").required(),
});

export default translateMediaValidator;
