'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 8010;
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const ridesRouter = require("./src/routes/rides");
const serviceRouter = require("./src/routes/service");
const buildSchemas = require('./src/schemas/rides');
const sqlite3 = require('sqlite3').verbose();


const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Library API",
			version: "1.0.0",
			description: "A simple Express Library API",
		},
		servers: [
			{
				url: `http://localhost:${PORT}`,
			},
		],
	},
	apis: ["./src/routes/*Swagger.js"],
};

const specs = swaggerJsDoc(options);

const db = new sqlite3.Database(':memory:');


db.serialize(() => buildSchemas(db));

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.db = db;

app.use(express.json());

app.use("/", ridesRouter);
app.use("/", serviceRouter);

app.listen(PORT, () => console.log(`App started and listening on PORT ${PORT}`));