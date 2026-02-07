import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { connectDB } from './config/mongodb';
import { redisClient } from './config/redis';

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectDB();
    await redisClient.connect();
    console.log('Redis connected');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

startServer();
