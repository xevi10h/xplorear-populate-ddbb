export default class InvalidCredentialsError extends Error {
  constructor(mensaje: string) {
    super(mensaje);
    this.name = "InvalidCredentialsError";
    this.message = mensaje;
  }
}
