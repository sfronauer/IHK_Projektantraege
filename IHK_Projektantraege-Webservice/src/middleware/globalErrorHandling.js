import ErrorResponseModel from '../models/errorResponseModel.js';

const errorHandling = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).send(new ErrorResponseModel('Token is invalid or missing'));
  }
  return res.status(500).send(new ErrorResponseModel(`Server Error: ${err}`));
};

export default errorHandling;
