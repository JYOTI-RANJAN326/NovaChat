class ApiResponse {
  constructor(success, message, data = null) {
    this.success = success;
    this.message = message;
    this.data = data;
  }

  static success(res, statusCode, message, data = null) {
    return res.status(statusCode).json(
      new ApiResponse(true, message, data)
    );
  }

  static error(res, statusCode, message) {
    return res.status(statusCode).json(
      new ApiResponse(false, message)
    );
  }
}

module.exports = ApiResponse;