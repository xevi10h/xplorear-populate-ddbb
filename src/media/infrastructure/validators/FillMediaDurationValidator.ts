import Joi from "joi";

const fillMediaDurationValidator = Joi.object({
  mediaIds: Joi.array().items(Joi.string()),
});

export default fillMediaDurationValidator;
