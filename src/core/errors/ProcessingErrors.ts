export class ProcessingError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = "ProcessingError";
  }
}

export class ValidationError extends ProcessingError {
  constructor(message: string) {
    super(message, "VALIDATION_ERROR");
  }
}
