class AppError extends Error {
  private code: number | undefined;

  constructor(message: string, code?: number) {
    super(message);
    this.code = code;
  }

  getCode(): number | undefined {
    return this.code;
  }
}

export default AppError;
