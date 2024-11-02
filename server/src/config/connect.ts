import mongoose from "mongoose";

export const connectDB = async (uri: string) => {
  try {
    await mongoose.connect(uri);
    console.log("Database connected ✅");
  } catch (error) {
    console.log(error);
  }
};
