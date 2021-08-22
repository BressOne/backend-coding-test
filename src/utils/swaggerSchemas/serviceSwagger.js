/**
 * @swagger
 * components:
 *   schemas:
 *     HealthCheck:
 *       type: object
 *       required:
 *         - response
 *       properties:
 *         response:
 *           type: TEXT
 *           description: Response text
 *       example:
 *         response: Healthy
 */

/**
  * @swagger
  * tags:
  *   name: Service
  *   description: The service api calls
  */

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Responces 200 if the service is up and running. Liveness check.
 *     tags: [Service]
 *     responses:
 *       200:
 *         description: Service live
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthCheck'
 */
