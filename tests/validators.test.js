/* eslint-disable camelcase */
const { expect } = require('chai');
const { describe, it } = require('mocha');

const {
  validateRide,
  validateRidesRequest,
} = require('../src/utils/validators');

const rideAsset = {
  body: {
    start_lat: -32,
    start_long: 34,
    end_lat: 1,
    end_long: -1,
    rider_name: 'Bopt',
    driver_name: 'L.Blake',
    driver_vehicle: 'Just a car',
  },
};

const ridesRequest = {
  query: {
    page: 1,
    page_size: 1,
  },
};

describe('Validators tests', () => {
  describe('validateRide', () => {
    it('should throw if input is invalid', (done) => {
      expect(() => validateRide({ body: {} })).to.throw('Start latitude and longitude must be a number');
      expect(() => validateRide({
        body: { start_lat: -32 },
      })).to.throw('Start latitude and longitude must be a number');
      expect(() => validateRide({
        body: {
          start_lat: -32,
          start_long: -1,
        },
      })).to.throw('Start latitude and longitude must be a number');
      expect(() => validateRide({
        body: {
          start_lat: -32,
          start_long: -1,
          end_lat: 1,
        },
      })).to.throw('Start latitude and longitude must be a number');
      expect(() => validateRide({
        body: {
          start_lat: -32,
          start_long: -1,
          end_lat: 1,
          end_long: 1,
        },
      })).to.throw('Some of required parameters missing');
      expect(() => validateRide({
        body: {
          start_lat: -32,
          start_long: 34,
          end_lat: 1,
          end_long: -1,
          rider_name: 'Bopt',
        },
      })).to.throw('Some of required parameters missing');
      expect(() => validateRide({
        body: {
          start_lat: -32,
          start_long: 34,
          end_lat: 1,
          end_long: -1,
          rider_name: 'Bopt',
          driver_name: 'L.Blake',
        },
      })).to.throw('Some of required parameters missing');
      expect(() => validateRide({ body: { ...rideAsset, start_lat: 's' } })).to.throw();
      expect(() => validateRide({ body: { ...rideAsset, start_lat: true } })).to.throw();
      expect(() => validateRide({ body: { ...rideAsset, start_lat: undefined } })).to.throw();
      expect(() => validateRide({ body: { ...rideAsset, start_lat: 91 } })).to.throw();
      expect(() => validateRide({ body: { ...rideAsset, start_lat: -91 } })).to.throw();
      expect(() => validateRide({ body: { ...rideAsset, start_long: 's' } })).to.throw();
      expect(() => validateRide({ body: { ...rideAsset, start_long: true } })).to.throw();
      expect(() => validateRide({ body: { ...rideAsset, start_long: undefined } })).to.throw();
      expect(() => validateRide({ body: { ...rideAsset, start_long: 181 } })).to.throw();
      expect(() => validateRide({ body: { ...rideAsset, start_long: -181 } })).to.throw();
      expect(() => validateRide({ body: { ...rideAsset, end_lat: 's' } })).to.throw();
      expect(() => validateRide({ body: { ...rideAsset, end_lat: true } })).to.throw();
      expect(() => validateRide({ body: { ...rideAsset, end_lat: undefined } })).to.throw();
      expect(() => validateRide({ body: { ...rideAsset, end_lat: 91 } })).to.throw();
      expect(() => validateRide({ body: { ...rideAsset, end_lat: -91 } })).to.throw();
      expect(() => validateRide({ body: { ...rideAsset, start_long: 's' } })).to.throw();
      expect(() => validateRide({ body: { ...rideAsset, start_long: true } })).to.throw();
      expect(() => validateRide({ body: { ...rideAsset, start_long: undefined } })).to.throw();
      expect(() => validateRide({ body: { ...rideAsset, start_long: 181 } })).to.throw();
      expect(() => validateRide({ body: { ...rideAsset, start_long: -181 } })).to.throw();
      expect(() => validateRide({ body: { ...rideAsset, rider_name: true } })).to.throw();
      expect(() => validateRide({ body: { ...rideAsset, rider_name: undefined } })).to.throw();
      expect(() => validateRide({ body: { ...rideAsset, rider_name: 181 } })).to.throw();
      expect(() => validateRide({ body: { ...rideAsset, driver_name: true } })).to.throw();
      expect(() => validateRide({ body: { ...rideAsset, driver_name: undefined } })).to.throw();
      expect(() => validateRide({ body: { ...rideAsset, driver_name: 181 } })).to.throw();
      expect(() => validateRide({ body: { ...rideAsset, driver_vehicle: true } })).to.throw();
      expect(() => validateRide({ body: { ...rideAsset, driver_vehicle: undefined } })).to.throw();
      expect(() => validateRide({ body: { ...rideAsset, driver_vehicle: 181 } })).to.throw();

      done();
    });
    it('should proceed if input is valid', (done) => {
      expect(() => validateRide(rideAsset)).not.to.throw();

      done();
    });
  });
  describe('validateRidesRequest', () => {
    it('should throw if input is invalid', (done) => {
      expect(() => validateRidesRequest({ query: { ...ridesRequest, page: 'S' } })).to.throw('Invalid parameter');
      expect(() => validateRidesRequest({ query: { ...ridesRequest, page: -1 } })).to.throw('page need to be >0');
      expect(() => validateRidesRequest({ query: { ...ridesRequest, page_size: -1 } })).to.throw('page_size need to be >0 and <100');
      expect(() => validateRidesRequest({ query: { ...ridesRequest, page_size: 101 } })).to.throw('page_size need to be >0 and <100');

      done();
    });
    it('should proceed if input is valid', (done) => {
      expect(() => validateRidesRequest({ query: {} })).not.to.throw();
      expect(() => validateRidesRequest(ridesRequest)).not.to.throw();

      done();
    });
  });
});
