# Xendit Coding Exercise

Provided exercise is an example implementation of API based on NodeJS. This API allows to store and read Rides.

To get started, ensure you are running nodeJS 14 LTS. However, development was done under the 14.17.5 LTS, so keep that in mind.
Stability is not guaranteed if you are using older versions of NodeJS.

1.  [Installation](#Installation)
2.  [Environment](#Environment)
3.  [API](#API)
4.  [Features](#Features)
5.  [Security](#security)
6.  [Load Testing](#load-testing)

## Installation

To install dependencies use `npm ci`, or you also free to use `npm install`.
Once done just simply run `npm start`, or dev runs use `npm run dev`, to get the server up and running on the port specified in the PORT env variable or on the 8010 port as a fallback if none is specified.
Also you can use debug mode. Debugging profile is set.

> NOTE: project uses sqlite3 which requires python being installed in
> your OS. Python v. 2.7 is suggested.

## Environment

There are several env vars, which the service can be adjusted with:
|var|effect |
|--|--|
|PORT|Integer, the port on which the service will be set up|
|ALLOW_LOGGING|Cast to Boolean, will surpress or allow logging in console|
|EXPOSE_SWAGGER|Cast to Boolean, allows to control, wether the swagger doc ui will be available on `/api-docs` or not|
|ALOWED_ORIGINS|Comma-separated list of allowed origins, allows to control, which origins are allowed to access the api. If not provided - will be set to wildcard/ Example: "stackoverflow.com,stack.com"|
|ENABLE_BRUTE_FORCE_PROTECTION|0 or 1, casts to Boolean. Allows to control BF protection. Disabled, bu default|
|BF_FREE_RETRIES|Integer >1. Allows to control BF retries. Defaults to 2 inside BF package|
|BF_MAX_WAIT|integer >1, ms. The initial wait time after the user runs out of retries. Defaults to 500 milliseconds|

## API

Once you are live you can use your favorite tool to access the API
API is documented with Swagger and is available on the `/api-docs`. Ensure `EXPOSE_SWAGGER=1`in your env.
Use GET `/health`route for liveness check. 200 status is expected.
Use POST `/rides` with JSON body, containing fields:
|key|value |
|--|--|
|start_lat| decimal >=-90 and <=90|
|start_long| decimal >=-180 and <=180|
|end_lat| decimal >=-90 and <=90|
|end_long| decimal >=-180 and <=180|
|ride_rName| string with >1 chars|
|driver_name| string with >1 chars|
|driver_vehicle| string with >1 char|

in respose you will get created Ride object witl auto-generated

| key     | value       |
| ------- | ----------- |
| id      | string      |
| created | date string |

and fields you passed in.

Use GET `/rides` route for a list of existing rides. Use optional query params: `page` and `page_size` to adjust the pagination. Response will have shape:
`{ "page": 1, "total_pages": 64, "items": [Rides] }`
Note: `page` defaults to 1 if none given
`page_size` defaults to 10 if none given, Max page size is 100

Use GET `/rides/{id}` route for an existing ride. Rides object is expected to be returned.

## Features

### Logging.

Using Winston logging is set up to store logs errors and combined log in the `logs` folder of the root of the project. `ALLOW_LOGGING`env variable controlls console logging.

### API docs.

Swagger. Ensure you edit the swagger schema when editing any of the routes in the service. Each of swgger doc chunks is named using pattern `{route}Swagger.js` and are located: `./src/utils/swaggerSchemas/{route}Swagger.js`

### Security.

Service protected from sql injections, bruteforce and cors. Anyway, see env variables to adjust your security

### Tests.

Check package.json for testing commands.
Use the sequence to run all tests available and to generate report: `npm run cover:merge` and then `npm run cover:report`
To run load tests first spinup service: `npm start` and then `npm run test:load`

### CICD

Done using CircleCi. Check config in `./.circleci` folder for details.
