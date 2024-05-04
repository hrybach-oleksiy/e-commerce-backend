require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const router = require('./router/index');
const errorMiddleware = require('./middlewares/error-middleware');

const PORT = process.env.PORT || 5000;
const { DB_URL } = process.env;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
  try {
    if (!DB_URL) {
      throw new Error('DB_URL is not defined in the environment');
    }

    await mongoose.connect(DB_URL);

    app.listen(PORT, () => {
      console.log(`Server starts on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
