import Joi from "joi";

const populateMediaValidator = Joi.object({
  placeId: Joi.string().required(), // Normally will be the city
  number: Joi.number(), // The number of new places we want to add (1 if not specified)
  lang: Joi.string().valid("en-US", "fr-FR", "es-ES"),
});

export default populateMediaValidator;
