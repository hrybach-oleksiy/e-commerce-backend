require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const router = require('./router/index');
const errorMiddleware = require('./middlewares/error-middleware');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3000;
const { DB_URL } = process.env;
const app = express();

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for e-commerce pet project',
    version: '1.0.1',
    description: 'This is a REST API application made with Express. It retrieves data from the app server',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
  },
  servers: [
    {
      url: 'http://localhost:5000/api',
      description: 'Development server',
    },
    {
      url: 'https://codefrondlers.store/jsfe23q4/api',
      description: 'Production server',
    },
  ],
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ['./router/*.js', './models/*.js', './schemas/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

const dirName = path.resolve();
const uploadFolder = path.join(dirName, 'uploads');
fs.mkdirSync(uploadFolder, { recursive: true });

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    console.log(file);
    const productId = request.params.id;
    const folderPath = path.join(uploadFolder, productId);
    return callback(null, uploadFolder);
  },
  filename: (request, file, callback) => {
    console.log(file);
    const originalFileName = file.originalname.split('.')[0];
    const fileName = originalFileName + path.extname(file.originalname);
    console.log(fileName);
    return callback(null, fileName);
  },
});

const upload = multer({ storage: storage });

app.use(express.json());
app.use(cookieParser());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(
  cors({
    origin: ['https://hrybach-oleksiy.github.io', 'http://localhost:5173', 'https://playoffthecuff.github.io'],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204,
  }),
);
app.use('/api', router);
app.use((req, res, next) => {
  res.setHeader('Permissions-Policy', 'interest-cohort=()');
  next();
});
app.use(errorMiddleware);

const start = async () => {
  try {
    if (!DB_URL) {
      throw new Error('DB_URL is not defined in the environment');
    }

    await mongoose.connect(DB_URL);
    // const db = mongoose.connection;
    // const collections = await db.db.listCollections().toArray();

    // for (const collection of collections) {
    //   const count = await db.collection(collection.name).countDocuments();
    //   console.log(`Collection: ${collection.name}, Documents: ${count}`);
    // }
    app.listen(PORT, () => {
      console.log(`Server starts on port ${PORT}`, mongoose.connection.name);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
