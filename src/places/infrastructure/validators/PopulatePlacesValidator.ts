import Joi from "joi";

const populatePlacesValidator = Joi.object({
  zone: Joi.string().required(), // Normally will be the city, zone or neighborhood
  number: Joi.number().min(0).max(10), // The number of new places we want to add (1 if not specified)
});

export default populatePlacesValidator;
