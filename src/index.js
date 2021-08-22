const express = require('express');
const swaggerUI = require('swagger-ui-express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const ridesRouter = require('./routes/ridesRoutes');
const serviceRouter = require('./routes/servicerRoutes');
const buildSchemas = require('./schemas/rides');
const specs = require('./utils/swagger');
const corsOptions = require('./utils/cors');
const bruteforce = require('./utils/bruteForce');

const app = express();

const db = new sqlite3.Database(':memory:');

db.serialize(() => buildSchemas(db));

if (true) {
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
}

app.db = db;

app.use(cors(corsOptions));
app.use(bruteforce.prevent);

app.use(express.json());

app.use('/', ridesRouter);
app.use('/', serviceRouter);

module.exports = app;
