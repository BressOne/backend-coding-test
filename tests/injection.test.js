/* eslint-disable camelcase */
const request = require('supertest');
const {
  describe, it,
} = require('mocha');

const app = require('../src/index');

const rideAsset = {
  start_lat: -32.0,
  start_long: 34.0,
  end_lat: 1.1,
  end_long: -1.1,
  rider_name: 'Bo\'pt',
  driver_name: 'L.Bl\'ake',
  driver_vehicle: 'Ju\'st a car',
};

describe('API sql injection tests', () => {
  describe('POST /rides', () => {
    it('should create and return new ride with Id and created datetime', (done) => {
      request(app)
        .post('/rides')
        .send(rideAsset)
        .expect('Content-Type', /application\/json/)
        .expect((response) => {
          const {
            ride_id,
            start_lat,
            start_long,
            end_lat,
            end_long,
            rider_name,
            driver_name,
            driver_vehicle,
            created,
          } = response;
          return (
            Boolean(ride_id)
            && Boolean(start_lat)
            && Boolean(start_long)
            && Boolean(end_lat)
            && Boolean(end_long)
            && Boolean(rider_name)
            && Boolean(driver_name)
            && Boolean(driver_vehicle)
            && Boolean(created)
            && !Number.isNaN(Date.parse(created))
          );
        })
        .expect(200, done);
    });
  });
});
