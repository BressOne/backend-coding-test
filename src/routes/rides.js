const express = require('express');
const {
  apiToDb:
   { rideToDb },
  dbToApi:
    { rideToApi },
} = require('../utils/mapers');

const router = express.Router();

router.post('/rides', (req, res) => {
  if (typeof req.body.start_lat !== 'number'
|| typeof req.body.start_long !== 'number'
|| typeof req.body.end_lat !== 'number'
|| typeof req.body.end_long !== 'number') {
    return res.status(400).send({
      error_code: 'VALIDATION_ERROR',
      message: 'Start latitude and longitude must be a number',
    });
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

  if (!startLatitude
      || !startLongitude
      || !endLatitude
      || !endLongitude
      || !riderName
      || !driverName
      || !driverVehicle) {
    return res.status(400).send({
      error_code: 'VALIDATION_ERROR',
      message: 'Some of required parameters missing',
    });
  }
  if (startLatitude < -90 || startLatitude > 90 || startLongitude < -180 || startLongitude > 180) {
    return res.status(400).send({
      error_code: 'VALIDATION_ERROR',
      message: 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
    });
  }

  if (endLatitude < -90 || endLatitude > 90 || endLongitude < -180 || endLongitude > 180) {
    return res.status(400).send({
      error_code: 'VALIDATION_ERROR',
      message: 'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
    });
  }

  if (typeof riderName !== 'string' || riderName.length < 1) {
    return res.status(400).send({
      error_code: 'VALIDATION_ERROR',
      message: 'Rider name must be a non empty string',
    });
  }

  if (typeof driverName !== 'string' || driverName.length < 1) {
    return res.status(400).send({
      error_code: 'VALIDATION_ERROR',
      message: 'Rider name must be a non empty string',
    });
  }

  if (typeof driverVehicle !== 'string' || driverVehicle.length < 1) {
    return res.status(400).send({
      error_code: 'VALIDATION_ERROR',
      message: 'Rider name must be a non empty string',
    });
  }

  const values = [startLatitude,
    startLongitude,
    endLatitude,
    endLongitude,
    riderName,
    driverName,
    driverVehicle];

  return req.app.db.run('INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)',
    values, function fn(err) {
      if (err) {
        return res.status(500).send({
          error_code: 'SERVER_ERROR',
          message: 'Unknown error',
        });
      }

      return req.app.db.all('SELECT * FROM Rides WHERE rideID = ?', this.lastID, (error, rows) => {
        if (error || !(rows || rows[0])) {
          return res.status(500).send({
            error_code: 'SERVER_ERROR',
            message: 'Unknown error',
          });
        }
        return res.send(rideToApi(rows[0]));
      });
    });
});

router.get('/rides', async (req, res) => {
  if ((Number.isNaN(Number(req.query.page)) && req.query.page !== undefined)
  || (Number.isNaN(Number(req.query.page_size)) && req.query.page_size !== undefined)) {
    return res.status(400).send({
      error_code: 'VALIDATION_ERROR',
      message: 'Invalid parameter',
    });
  }
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.page_size) || 10;

  if (pageSize < 1 || pageSize > 100) {
    return res.status(400).send({
      error_code: 'VALIDATION_ERROR',
      message: 'page_size need to be >0',
    });
  }

  if (page < 1) {
    return res.status(400).send({
      error_code: 'VALIDATION_ERROR',
      message: 'page need to be >0',
    });
  }

  const offset = (page - 1) * pageSize;

  const data = await Promise.all([
    new Promise((resolve) => {
      req.app.db.all('SELECT count() FROM Rides', (err, rows) => {
        if (err || !rows) {
          return res.status(500).send({
            error_code: 'SERVER_ERROR',
            message: 'Unknown error',
          });
        }
        return resolve(rows[0]['count()']);
      });
    }),
    new Promise((resolve) => {
      req.app.db.all(`SELECT * FROM Rides ORDER BY rideID limit ${pageSize} offset ${offset}`, (err, rows) => {
        if (err || !rows) {
          return res.status(500).send({
            error_code: 'SERVER_ERROR',
            message: 'Unknown error',
          });
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
});

router.get('/rides/:id', (req, res) => {
  req.app.db.all(`SELECT * FROM Rides WHERE rideID='${req.params.id}'`, (err, rows) => {
    if (err || !rows) {
      return res.status(500).send({
        error_code: 'SERVER_ERROR',
        message: 'Unknown error',
      });
    }

    if (rows.length === 0) {
      return res.status(404).send({
        error_code: 'RIDES_NOT_FOUND_ERROR',
        message: 'Could not find any rides',
      });
    }

    return res.send(rideToApi(rows[0]));
  });
});

module.exports = router;
