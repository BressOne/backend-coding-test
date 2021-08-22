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

const sendServerError = (res, err) => res.status(err.code).send({
  error_code: err.type,
  message: err.message,
});

const getRideById = async (req, res) => {
  const response = await new Promise((resolve) => {
    req.app.db.all('SELECT * FROM Rides WHERE rideID=?', req.params.id, (err, rows) => {
      if (err || !rows) {
        return sendServerError(res);
      }

      if (rows.length === 0) {
        return res.status(404).send({
          error_code: RIDES_NOT_FOUND_ERROR,
          message: 'Could not find any rides',
        });
      }
      return resolve(rideToApi(rows[0]));
    });
  });
  return res.send(response);
};

const createRide = async (req, res) => {
  try { validateRide(req, res); } catch (err) {
    return sendServerError(res, err);
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

  const values = [startLatitude,
    startLongitude,
    endLatitude,
    endLongitude,
    riderName,
    driverName,
    driverVehicle];

  try {
    const createdRide = await new Promise((resolve) => {
      req.app.db.run('INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)',
        values, function fn(err) {
          if (err) {
            return sendServerError(res);
          }
          return resolve(this);
        });
    });
    const response = await new Promise((resolve) => {
      req.app.db.all('SELECT * FROM Rides WHERE rideID = ?', createdRide.lastID, (error, rows) => {
        if (error || !(rows || rows[0])) {
          return sendServerError(res);
        }
        return resolve(rideToApi(rows[0]));
      });
    });
    return res.send(response);
  } catch (error) {
    return sendServerError(res);
  }
};

const getRidesList = async (req, res) => {
  try { validateRidesRequest(req, res); } catch (err) {
    return sendServerError(res, err);
  }

  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.page_size) || 10;
  const offset = (page - 1) * pageSize;

  const data = await Promise.all([
    new Promise((resolve) => {
      req.app.db.all('SELECT count() FROM Rides', (err, rows) => {
        if (err || !rows) {
          return sendServerError(res);
        }
        return resolve(rows[0]['count()']);
      });
    }),
    new Promise((resolve) => {
      req.app.db.all('SELECT * FROM Rides ORDER BY rideID limit ? offset ?', [pageSize, offset], (err, rows) => {
        if (err || !rows) {
          return sendServerError(res);
        }
        return resolve(rows);
      });
    }),
  ]);

  const response = {
    page,
    total_pages: Math.ceil(data[0] / pageSize),
    items: data[1] && data[1].length ? [
      data[1],
    ] : [],
  };

  return res.send(response);
};

module.exports = { getRideById, getRidesList, createRide };
