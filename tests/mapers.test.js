/* eslint-disable camelcase */
const { expect } = require('chai');
const { describe, it } = require('mocha');

const {
  dbToApi: {
    rideToApi,
  },
  apiToDb: {
    rideToDb,
  },
} = require('../src/utils/mapers');

const dbObj = {
  rideID: 1,
  startLat: 1,
  startLong: 1,
  endLat: 1,
  endLong: 1,
  riderName: 'S',
  driverName: 'S',
  driverVehicle: 'S',
  created: '2021-08-21 14:14:40',
};
const apiObj = {
  start_lat: 1,
  start_long: 1,
  end_lat: 1,
  end_long: 1,
  rider_name: 's',
  driver_name: 's',
  driver_vehicle: 's',

};

describe('Mapers tests', () => {
  describe('rideToApi', () => {
    it('should return maped obj', (done) => {
      const result = rideToApi(dbObj);
      expect(result.ride_id).to.equal(dbObj.rideID);
      expect(result.start_lat).to.equal(dbObj.startLat);
      expect(result.start_long).to.equal(dbObj.startLong);
      expect(result.end_lat).to.equal(dbObj.endLat);
      expect(result.end_long).to.equal(dbObj.endLong);
      expect(result.rider_name).to.equal(dbObj.riderName);
      expect(result.driver_name).to.equal(dbObj.driverName);
      expect(result.driver_vehicle).to.equal(dbObj.driverVehicle);
      expect(result.created).to.equal(dbObj.created);
      done();
    });
  });

  describe('rideToDb', () => {
    it('should return maped obj', (done) => {
      const result = rideToDb(apiObj);
      expect(result.startLatitude).to.equal(Number(apiObj.start_lat));
      expect(result.startLongitude).to.equal(Number(apiObj.start_long));
      expect(result.endLatitude).to.equal(Number(apiObj.end_lat));
      expect(result.endLongitude).to.equal(Number(apiObj.end_long));
      expect(result.riderName).to.equal(apiObj.rider_name);
      expect(result.driverName).to.equal(apiObj.driver_name);
      expect(result.driverVehicle).to.equal(apiObj.driver_vehicle);
      done();
    });
  });
});
