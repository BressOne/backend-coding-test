const rideToApi = (dbObj) => ({
  ride_id: dbObj.rideID,
  start_lat: dbObj.startLat,
  start_long: dbObj.startLong,
  end_lat: dbObj.endLat,
  end_long: dbObj.endLong,
  rider_name: dbObj.riderName,
  driver_name: dbObj.driverName,
  driver_vehicle: dbObj.driverVehicle,
  created: dbObj.created,
});

const rideToDb = (apiObj) => ({
  startLatitude: Number(apiObj.start_lat),
  startLongitude: Number(apiObj.start_long),
  endLatitude: Number(apiObj.end_lat),
  endLongitude: Number(apiObj.end_long),
  riderName: apiObj.rider_name,
  driverName: apiObj.driver_name,
  driverVehicle: apiObj.driver_vehicle,
});

module.exports = {
  dbToApi: {
    rideToApi,
  },
  apiToDb: {
    rideToDb,
  },
};
