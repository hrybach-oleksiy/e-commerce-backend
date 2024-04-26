import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();

const PORT = process.env.PORT || 5000;
const { DB_URL } = process.env;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

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
