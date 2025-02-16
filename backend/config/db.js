import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDb = async () => {
  try {
    const mongooseConnection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${mongooseConnection.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};
