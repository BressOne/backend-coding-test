const getRideByRideId = async (req, id) => new Promise((resolve) => {
  req.app.db.all('SELECT * FROM Rides WHERE rideID=?', id, (err, rows) => {
    if (err) {
      throw err;
    }
    return resolve(rows[0]);
  });
});

const insertRide = async (req, values) => new Promise((resolve) => {
  req.app.db.run('INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)',
    values, function fn(err) {
      if (err) {
        throw err;
      }
      return resolve(this);
    });
});

const countRides = (req) => new Promise((resolve) => {
  req.app.db.all('SELECT count() FROM Rides', (err, rows) => {
    if (err || !rows) {
      throw err;
    }
    return resolve(rows[0]['count()']);
  });
});

const getRidesPagination = (req, pageSize, offset) => new Promise((resolve) => {
  req.app.db.all('SELECT * FROM Rides ORDER BY rideID limit ? offset ?', [pageSize, offset], (err, rows) => {
    if (err || !rows) {
      throw err;
    }
    return resolve(rows);
  });
});

module.exports = {
  getRideByRideId, insertRide, countRides, getRidesPagination,
};
