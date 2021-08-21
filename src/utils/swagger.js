const swaggerJsDoc = require('swagger-jsdoc');

const PORT = process.env.PORT || 8010;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Library API',
      version: '1.0.0',
      description: 'A simple Express Library API',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ['./src/routes/*Swagger.js'],
};

module.exports = swaggerJsDoc(options);
