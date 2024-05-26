import mongoose from "mongoose";

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("connected to the database");
  } catch (error) {
    console.log(error);
    throw new Error({ message: "Error in connecting to the database" });
  }
};

export default connectDB;
