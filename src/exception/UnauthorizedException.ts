export class UnauthorizedException extends Error {
    public readonly statusCode: number;
  
    constructor(message: string) {
      super(message);
      this.name = this.constructor.name;
      this.statusCode = 401;
      Object.setPrototypeOf(this, new.target.prototype);
    }
  }