/**
 * @swagger
 * components:
 *   schemas:
 *     Ride:
 *       type: object
 *       required:
 *         - start_lat
 *         - start_long
 *         - end_lat
 *         - end_long
 *         - rider_name
 *         - driver_name
 *         - driver_vehicle
 *       properties:
 *         rideID:
 *           type: INTEGER
 *           description: unique rideID
 *         start_lat:
 *           type: DECIMAL
 *           description: The ride starting latitude. Is >=-90 && <=90
 *         start_long:
 *           type: DECIMAL
 *           description: The ride starting longitude. Is >=-180 && <=180
 *         end_lat:
 *           type: DECIMAL
 *           description: The ride ending latitude. Is >=-90 && <=90
 *         end_long:
 *           type: DECIMAL
 *           description: The ride ending longitude. Is >=-180 && <=180
 *         rider_name:
 *           type: TEXT
 *           description: The rider name. Is >1 char
 *         driver_name:
 *           type: TEXT
 *           description: The driver name. Is >1 char
 *         driver_vehicle:
 *           type: TEXT
 *           description: The driver vehicle name. Is >1 char
 *         created:
 *           type: DATETIME
 *           description: Autogenerated dateTime string
 *       example:
 *         ride_id: 12
 *         start_lat: -32
 *         start_long: 34
 *         end_lat: 1
 *         end_long: -1
 *         rider_name: Bopt
 *         driver_name: L.Blake
 *         driver_vehicle: Just a car
 *         created: 2021-08-21 14:14:40
 *     RidePayload:
 *       type: object
 *       required:
 *         - start_lat
 *         - start_long
 *         - end_lat
 *         - end_long
 *         - rider_name
 *         - driver_name
 *         - driver_vehicle
 *       properties:
 *         start_lat:
 *           type: DECIMAL
 *           description: The ride starting latitude. Is >=-90 && <=90
 *         start_long:
 *           type: DECIMAL
 *           description: The ride starting longitude. Is >=-180 && <=180
 *         end_lat:
 *           type: DECIMAL
 *           description: The ride ending latitude. Is >=-90 && <=90
 *         end_long:
 *           type: DECIMAL
 *           description: The ride ending longitude. Is >=-180 && <=180
 *         rider_name:
 *           type: TEXT
 *           description: The rider name. Is >1 char
 *         driver_name:
 *           type: TEXT
 *           description: The driver name. Is >1 char
 *         driver_vehicle:
 *           type: TEXT
 *           description: The driver vehicle name. Is >1 char
 *       example:
 *         start_lat: -32
 *         start_long: 34
 *         end_lat: 1
 *         end_long: -1
 *         rider_name: Bopt
 *         driver_name: L.Blake
 *         driver_vehicle: Just a car
 *     Error:
 *       type: object
 *       properties:
 *         error_code:
 *           type: TEXT
 *           description: The error code
 *         message:
 *           type: TEXT
 *           description: The error description
 *       example:
 *         error_code: RIDES_NOT_FOUND_ERROR
 *         message: Could not find any rides
 */

/**
  * @swagger
  * tags:
  *   name: Rides
  *   description: The rides managing API
  */

/**
 * @swagger
 * /rides:
 *   post:
 *     summary: Create a new ride
 *     tags: [Rides]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RidePayload'
 *     responses:
 *       200:
 *         description: The ride was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ride'
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       400:
 *         description: Invalid parameter
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /rides:
 *   get:
 *     summary: Returns the list of all the rides
 *     tags: [Rides]
 *     responses:
 *       200:
 *         description: The list of the rides
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ride'
 *       404:
 *         description: Rides were not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /rides/{id}:
 *   get:
 *     summary: Get the ride by id
 *     tags: [Rides]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ride id
 *     responses:
 *       200:
 *         description: The ride description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ride'
 *       404:
 *         description: The ride was not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
