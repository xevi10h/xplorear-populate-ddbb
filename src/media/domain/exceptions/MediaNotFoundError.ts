export default class MediaNotFoundError extends Error {
  constructor(mensaje: string) {
    super(mensaje);
    this.name = "MediaNotFoundError";
    this.message = mensaje;
  }
}
