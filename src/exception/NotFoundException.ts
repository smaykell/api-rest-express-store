export class NotFoundException extends Error {
  public readonly statusCode: number;

  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = 404;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
