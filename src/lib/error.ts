interface IExpressValidator {
  param: string;
  msg: string;
}
class CustomError {
  status: number;
  message: string | IExpressValidator[];
  constructor(status: number, message: string | IExpressValidator[]) {
    this.status = status;
    this.message = message;
  }

  toJSON() {
    return {
      status: this.status,
      message: this.message,
    };
  }
}

export { CustomError };
