const {
  apiToDb:
   { rideToDb },
  dbToApi:
    { rideToApi },
} = require('../utils/mapers');
const {
  errorCode: {
    RIDES_NOT_FOUND_ERROR,
  },
} = require('../utils/errors');

const { validateRide, validateRidesRequest } = require('../utils/validators');
const {
  getRideByRideId, insertRide, getRidesPagination, countRides,
} = require('../models/ridesModel');

const sendServerError = (res, err) => res.status(err.code).send({
  error_code: err.type,
  message: err.message,
});

const getRideById = async (req, res) => {
  try {
    const response = await getRideByRideId(req, req.params.id);
    if (!response) {
      return res.status(404).send({
        error_code: RIDES_NOT_FOUND_ERROR,
        message: 'Could not find any rides',
      });
    }
    return res.send(rideToApi(response));
  } catch (error) {
    return sendServerError(res);
  }
};

const createRide = async (req, res) => {
  try {
    validateRide(req, res);
    const {
      startLatitude,
      startLongitude,
      endLatitude,
      endLongitude,
      riderName,
      driverName,
      driverVehicle,
    } = rideToDb(req.body);

    const values = [startLatitude,
      startLongitude,
      endLatitude,
      endLongitude,
      riderName,
      driverName,
      driverVehicle];

    const createdRide = await insertRide(req, values);
    const response = await getRideByRideId(req, createdRide.lastID);
    if (!response) {
      return res.status(404).send({
        error_code: RIDES_NOT_FOUND_ERROR,
        message: 'Could not find any rides',
      });
    }
    return res.send(rideToApi(response));
  } catch (error) {
    return sendServerError(res, error);
  }
};

const getRidesList = async (req, res) => {
  try {
    validateRidesRequest(req, res);

    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.page_size) || 10;
    const offset = (page - 1) * pageSize;

    const data = await Promise.all([
      countRides(req),
      getRidesPagination(req, pageSize, offset),
    ]);

    const response = {
      page,
      total_pages: Math.ceil(data[0] / pageSize),
      items: data[1] && data[1].length ? [
        data[1].map((item) => rideToApi(item)),
      ] : [],
    };

    return res.send(response);
  } catch (error) {
    return sendServerError(res, error);
  }
};

module.exports = { getRideById, getRidesList, createRide };
