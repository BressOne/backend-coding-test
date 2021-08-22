/* eslint-disable camelcase */
const path = require('path');

require('dotenv').config({ path: path.resolve(process.cwd(), './brute.env') });
const request = require('supertest');
const {
  describe, it,
} = require('mocha');

const app = require('../../src/index');

const rideAsset = {
  start_lat: -32.0,
  start_long: 34.0,
  end_lat: 1.1,
  end_long: -1.1,
  rider_name: 'Bo\'pt',
  driver_name: 'L.Bl\'ake',
  driver_vehicle: 'Ju\'st a car',
};

describe('API bruteforce protection tests', () => {
  describe('POST /rides', () => {
    it('Should return 429 and reject  id too many requests', async () => {
      await Promise.all([request(app)
        .post('/rides')
        .send(rideAsset), request(app)
        .post('/rides')
        .send(rideAsset), request(app)
        .post('/rides')
        .send(rideAsset), request(app)
        .post('/rides')
        .send(rideAsset), request(app)
        .post('/rides')
        .send(rideAsset)]);

      await request(app)
        .get('/rides')
        .query({ page: 1, page_size: 1 })
        .expect(429);

      return true;
    });
  });
});
