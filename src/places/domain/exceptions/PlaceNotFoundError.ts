export default class PlaceNotFoundError extends Error {
	constructor(mensaje: string) {
		super(mensaje);
		this.name = 'PlaceNotFoundError';
		this.message = mensaje;
	}
}
