import swaggereJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  swaggerDefinition: {
    info: {
      title: '게시판 API',
      version: '1.0.0',
      description: '기업과제 API with express',
    },
    host: 'localhost:10010',
    basePath: '/',
  },
  apis: ['./routes/*.js', './swagger/*'],
};

const specs = swaggereJsdoc(options);
export { specs, swaggerUi };
