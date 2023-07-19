import IAddress from '../interfaces/IAddress';
export default class Address implements IAddress {
	coordinates: {
		lat: number;
		lng: number;
	};
	street: string;
	city: string;
	postalCode: string;
	province?: string;
	country: string;

	constructor(address: IAddress) {
		this.coordinates = address.coordinates;
		this.street = address.street;
		this.city = address.city;
		this.postalCode = address.postalCode;
		this.province = address.province;
		this.country = address.country;
	}
}
