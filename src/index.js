const express = require('express');
const swaggerUI = require('swagger-ui-express');
const sqlite3 = require('sqlite3').verbose();

const ridesRouter = require('./routes/rides');
const serviceRouter = require('./routes/service');
const buildSchemas = require('./schemas/rides');
const specs = require('./utils/swagger');

const app = express();

const db = new sqlite3.Database(':memory:');

db.serialize(() => buildSchemas(db));

if (process.env.EXPOSE_SWAGGER) {
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
}

app.db = db;

app.use(express.json());

app.use('/', ridesRouter);
app.use('/', serviceRouter);

module.exports = app;
