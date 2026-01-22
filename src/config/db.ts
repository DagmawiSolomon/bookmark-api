
const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI || '';

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, clientOptions);
    console.log("MongoDB connected!");
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("MongoDB connection error:", err.message);
    } else {
      console.error("Unknown MongoDB connection error:", err);
    }
    process.exit(1); 
  }
};
