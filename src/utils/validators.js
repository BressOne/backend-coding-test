const {
  apiToDb:
   { rideToDb },
} = require('./mapers');
const {
  errorCode: {
    VALIDATION_ERROR,
  },
} = require('./errors');

const serviceError = (type, message, code) => {
  const err = new Error(message);
  err.code = code;
  err.type = type;
  return err;
};

const validateRide = (req) => {
  if (typeof req.body.start_lat !== 'number'
|| typeof req.body.start_long !== 'number'
|| typeof req.body.end_lat !== 'number'
|| typeof req.body.end_long !== 'number') {
    throw serviceError(
      VALIDATION_ERROR,
      'Start latitude and longitude must be a number',
      400,
    );
  }

  const {
    startLatitude,
    startLongitude,
    endLatitude,
    endLongitude,
    riderName,
    driverName,
    driverVehicle,
  } = rideToDb(req.body);

  if (startLatitude === undefined
      || startLongitude === undefined
      || endLatitude === undefined
      || endLongitude === undefined
      || riderName === undefined
      || driverName === undefined
      || driverVehicle === undefined) {
    throw serviceError(
      VALIDATION_ERROR,
      'Some of required parameters missing',
      400,
    );
  }
  if (startLatitude < -90 || startLatitude > 90 || startLongitude < -180 || startLongitude > 180) {
    throw serviceError(
      VALIDATION_ERROR,
      'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
      400,
    );
  }

  if (endLatitude < -90 || endLatitude > 90 || endLongitude < -180 || endLongitude > 180) {
    throw serviceError(
      VALIDATION_ERROR,
      'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
      400,
    );
  }

  if (typeof riderName !== 'string' || riderName.length < 1) {
    throw serviceError(
      VALIDATION_ERROR,
      'Rider name must be a non empty string',
      400,
    );
  }

  if (typeof driverName !== 'string' || driverName.length < 1) {
    throw serviceError(
      VALIDATION_ERROR,
      'Rider name must be a non empty string',
      400,
    );
  }

  if (typeof driverVehicle !== 'string' || driverVehicle.length < 1) {
    throw serviceError(
      VALIDATION_ERROR,
      'Rider name must be a non empty string',
      400,
    );
  }
  return true;
};

const validateRidesRequest = (req) => {
  if ((Number.isNaN(Number(req.query.page)) && req.query.page !== undefined)
  || (Number.isNaN(Number(req.query.page_size)) && req.query.page_size !== undefined)) {
    throw serviceError(
      VALIDATION_ERROR,
      'Invalid parameter',
      400,
    );
  }
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.page_size) || 10;

  if (pageSize < 1 || pageSize > 100) {
    throw serviceError(
      VALIDATION_ERROR,
      'page_size need to be >0 and <100',
      400,
    );
  }

  if (page < 1) {
    throw serviceError(
      VALIDATION_ERROR,
      'page need to be >0',
      400,
    );
  }
  return true;
};

module.exports = {
  validateRide,
  validateRidesRequest,
};
