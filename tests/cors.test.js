/* eslint-disable camelcase */
const path = require('path');

require('dotenv').config({ path: path.resolve(process.cwd(), './cors.env') });

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

describe('API cors injection tests', () => {
  describe('POST /rides', () => {
    it('should throw 500 if cors rejected', (done) => {
      request(app)
        .post('/rides')
        .set({ Origin: '1.fd.com' })
        .send(rideAsset)
        .expect('Content-Type', /text\/html/)
        .expect(500);
      done();
    });
    it('should return 200 if cors accepted', (done) => {
      request(app)
        .post('/rides')
        .set({ Origin: process.env.ALOWED_ORIGINS.split(',')[0] })
        .send(rideAsset)
        .expect(200);
      done();
    });
  });
});
