import Joi from 'joi';

const createPlaceValidator = Joi.object({
	id: Joi.string().hex().length(24),
	name: Joi.string().required(),
	value: Joi.number().required(),
	address: Joi.object({
		coordinates: Joi.object({
			lat: Joi.number().required(),
			lng: Joi.number().required(),
		}).required(),
		street: Joi.string().required(),
		city: Joi.string().required(),
		postalCode: Joi.string().required(),
		country: Joi.string().required(),
		province: Joi.string().optional(),
	}).required(),
	types: Joi.array().items(Joi.string()).required(),
});

export default createPlaceValidator;