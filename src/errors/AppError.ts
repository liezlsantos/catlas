class AppError extends Error {
  static CAT_IMAGE_NOT_FOUND = 1001;

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
