import { model, Model, Schema } from 'mongoose';
import IPlace from '../../domain/models/interfaces/IPlace';

const placeSchema = new Schema<IPlace>({
	name: { type: String, required: true },
	address: {
		coordinates: {
			lat: { type: Number, required: true },
			lng: { type: Number, required: true },
		},
		street: { type: String, required: true },
		city: { type: String, required: true },
		postalCode: { type: String, required: true },
		province: { type: String },
		country: { type: String, required: true },
	},
	value: { type: Number, required: true },
	types: { type: [String], required: true },
});

export const MongoPlaceModel = model('places', placeSchema);
