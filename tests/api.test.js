/* eslint-disable camelcase */
const request = require('supertest');
const {
  describe, it,
} = require('mocha');

const app = require('../src/index');

const rideAsset = {
  start_lat: -32,
  start_long: 34,
  end_lat: 1,
  end_long: -1,
  rider_name: 'Bopt',
  driver_name: 'L.Blake',
  driver_vehicle: 'Just a car',
};

describe('API tests', () => {
  describe('GET /health', () => {
    it('should return health 200', (done) => {
      request(app)
        .get('/health')
        .expect('Content-Type', /application\/json/)
        .expect(200, done);
    });
  });
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

    it('should throw when missing any of required params', (done) => {
      const coruptPayloads = Object.keys(rideAsset).map((key) => {
        const data = { ...rideAsset };
        delete data[key];
        return data;
      });
      Promise.all(coruptPayloads.map((payload) => request(app)
        .post('/rides')
        .send(payload)
        .expect('Content-Type', /application\/json/)
        .expect((response) => {
          const {
            error_code,
            message,
          } = response;
          return (Boolean(error_code) && Boolean(message)
          );
        })
        .expect(400)))
        .then(() => done());
    });

    it('should throw when start_lat input is invalid', (done) => {
      const coruptPayloads = [
        { ...rideAsset, start_lat: -91 },
        { ...rideAsset, start_lat: 91 },
        { ...rideAsset, start_lat: '' },
        { ...rideAsset, start_lat: true },
      ];
      Promise.all(coruptPayloads.map((payload) => request(app)
        .post('/rides')
        .send(payload)
        .expect('Content-Type', /application\/json/)
        .expect((response) => {
          const {
            error_code,
            message,
          } = response;
          return (Boolean(error_code) && Boolean(message)
          );
        })
        .expect(400)))
        .then(() => done());
    });

    it('should throw when start_long input is invalid', (done) => {
      const coruptPayloads = [
        { ...rideAsset, start_long: -181 },
        { ...rideAsset, start_long: 181 },
        { ...rideAsset, start_long: '' },
        { ...rideAsset, start_long: true },
      ];
      Promise.all(coruptPayloads.map((payload) => request(app)
        .post('/rides')
        .send(payload)
        .expect('Content-Type', /application\/json/)
        .expect((response) => {
          const {
            error_code,
            message,
          } = response;
          return (Boolean(error_code) && Boolean(message)
          );
        })
        .expect(400)))
        .then(() => done());
    });

    it('should throw when end_lat input is invalid', (done) => {
      const coruptPayloads = [
        { ...rideAsset, end_lat: -91 },
        { ...rideAsset, end_lat: 91 },
        { ...rideAsset, end_lat: '' },
        { ...rideAsset, end_lat: true },
      ];
      Promise.all(coruptPayloads.map((payload) => request(app)
        .post('/rides')
        .send(payload)
        .expect('Content-Type', /application\/json/)
        .expect((response) => {
          const {
            error_code,
            message,
          } = response;
          return (Boolean(error_code) && Boolean(message)
          );
        })
        .expect(400)))
        .then(() => done());
    });

    it('should throw when end_long input is invalid', (done) => {
      const coruptPayloads = [
        { ...rideAsset, end_long: -181 },
        { ...rideAsset, end_long: 181 },
        { ...rideAsset, end_long: '' },
        { ...rideAsset, end_long: true },
      ];
      Promise.all(coruptPayloads.map((payload) => request(app)
        .post('/rides')
        .send(payload)
        .expect('Content-Type', /application\/json/)
        .expect((response) => {
          const {
            error_code,
            message,
          } = response;
          return (Boolean(error_code) && Boolean(message)
          );
        })
        .expect(400)))
        .then(() => done());
    });

    it('should throw when rider_name, driver_name, driver_vehicle input is invalid', (done) => {
      const coruptPayloads = [
        { ...rideAsset, rider_name: -181 },
        { ...rideAsset, rider_name: 181 },
        { ...rideAsset, rider_name: true },
        { ...rideAsset, rider_name: undefined },
        { ...rideAsset, rider_name: { some: 'data' } },
        { ...rideAsset, driver_name: -181 },
        { ...rideAsset, driver_name: 181 },
        { ...rideAsset, driver_name: true },
        { ...rideAsset, driver_name: undefined },
        { ...rideAsset, driver_name: { some: 'data' } },
        { ...rideAsset, driver_vehicle: -181 },
        { ...rideAsset, driver_vehicle: 181 },
        { ...rideAsset, driver_vehicle: true },
        { ...rideAsset, driver_vehicle: undefined },
        { ...rideAsset, driver_vehicle: { some: 'data' } },

      ];
      Promise.all(coruptPayloads.map((payload) => request(app)
        .post('/rides')
        .send(payload)
        .expect('Content-Type', /application\/json/)
        .expect((response) => {
          const {
            error_code,
            message,
          } = response;
          return (Boolean(error_code) && Boolean(message)
          );
        })
        .expect(400)))
        .then(() => done());
    });
  });

  describe('GET /rides', () => {
    it('should return list of rides when any is in DB', (done) => {
      request(app)
        .post('/rides')
        .send(rideAsset)
        .expect('Content-Type', /application\/json/)
        .expect(200)
        .then(() => {
          request(app)
            .get('/rides')
            .expect('Content-Type', /application\/json/)
            .expect((response) => {
              if (!response || !response.length) {
                return false;
              }
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
              } = response[0];
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

  describe('GET /rides/{id}', () => {
    it('should return existing ride', (done) => {
      request(app)
        .post('/rides')
        .send(rideAsset)
        .expect('Content-Type', /application\/json/)
        .expect(200)
        .then((res) => {
          request(app)
            .get(`/rides/${res.body.ride_id}`)
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
            && Object.keys(rideAsset).every((key) => rideAsset[key] === response[key])
              );
            })
            .expect(200, done);
        });
    });
    it('should 404 when searching for nonexisting ride', (done) => {
      request(app)
        .get('/rides/99999999999999999999')
        .expect('Content-Type', /application\/json/)
        .expect((response) => {
          const {
            error_code,
            message,
          } = response;
          return (Boolean(error_code) && Boolean(message)
          );
        })
        .expect(404)
        .then(() => done());
    });
  });
});
