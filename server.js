require('dotenv').config();
const http = require('http');
const path = require('path');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const router = require('./router/index');
const errorMiddleware = require('./middlewares/error-middleware');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const resolveRefs = require('json-refs').resolveRefs;

const PORT = process.env.PORT || 3000;
const { DB_URL } = process.env;

/**
 * Return JSON with resolved references
 * @param {array | object} root - The structure to find JSON References within (Swagger spec)
 * @returns {Promise.<JSON>}
 */
const multiFileSwagger = (root) => {
  const options = {
    filter: ['relative', 'remote'],
    loaderOptions: {
      processContent: function (res, callback) {
        callback(null, YAML.parse(res.text));
      },
    },
  };

  return resolveRefs(root, options).then(
    function (results) {
      return results.resolved;
    },
    function (err) {
      console.log(err.stack);
    },
  );
};

const createServer = async () => {
  const app = express();

  const swaggerDocument = await multiFileSwagger(YAML.load(path.resolve(__dirname, './docs/swagger.yaml')));

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.use(
    cors({
      origin: ['https://hrybach-oleksiy.github.io', 'http://localhost:5173', 'https://playoffthecuff.github.io'],
      credentials: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      optionsSuccessStatus: 204,
    }),
  );

  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));
  app.use(cookieParser());

  app.use('/api', router);

  app.use((req, res, next) => {
    res.setHeader('Permissions-Policy', 'interest-cohort=()');
    next();
  });

  app.use(errorMiddleware);

  const server = http.createServer(app);

  return server;
};

const start = async () => {
  try {
    if (!DB_URL) {
      throw new Error('DB_URL is not defined in the environment');
    }

    await mongoose.connect(DB_URL);

    const server = await createServer();

    server.listen(PORT, () => {
      console.log(`Server starts on port ${PORT}`, `with the collection ${mongoose.connection.name}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
