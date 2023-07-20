import Joi from "joi";

const populatePlacesValidator = Joi.object({
  place: Joi.string().required(), // Normally will be the city
  placeExtra: Joi.string(), // Normally will be a specific zone or neighborhood
  number: Joi.number(), // The number of new places we want to add (1 if not specified)
});

export default populatePlacesValidator;
