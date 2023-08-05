export default class EmailIsAlreadyTakenError extends Error {
  constructor(mensaje: string) {
    super(mensaje);
    this.name = "Email Is Already Taken";
    this.message = mensaje;
  }
}
