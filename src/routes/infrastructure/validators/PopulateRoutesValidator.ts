import Joi from "joi";

const populatePlacesValidator = Joi.object({
  place: Joi.string().required(), // Normally will be the city, zone or neighborhood
  topic: Joi.string(),
  stops: Joi.number().min(3).max(10), // The number of new we want to add (1 if not specified)
  days: Joi.number().min(1).max(1),
  number: Joi.number().min(1).max(10),
});

export default populatePlacesValidator;
