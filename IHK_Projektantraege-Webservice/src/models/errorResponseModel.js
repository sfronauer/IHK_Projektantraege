import ResponseModel from './responseModel.js';

class ErrorResponseModel extends ResponseModel {
  constructor(message) {
    super(false, `An error occured: ${message}`, {});
  }
}

export default ErrorResponseModel;
