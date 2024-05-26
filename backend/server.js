import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoute.js";
import buyerSellerRoutes from "./routes/buyerSellerRoute.js";

const app = express();
const PORT = process.env.PORT || 3000;
const URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/properties", buyerSellerRoutes);

// Database configuration and server setup
const connectAndStart = async () => {
  try {
    await connectDB(URI);
    app.listen(PORT, () => {
      console.log(`Server is working on the port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

connectAndStart();
