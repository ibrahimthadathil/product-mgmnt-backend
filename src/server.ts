import "reflect-metadata";
import 'dotenv/config'
import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/DB_config";
import authRoute from "./routes/user/auth-route";
import { productRoute } from "./routes/product/product-route";
import cartRoute from "./routes/cart/cart-route";
import cookieParser from "cookie-parser";

dotenv.config();
connectDB();
const target = {
  origin: process.env.FRONTEND_URL,
  changeOrigin: true,
  credentials: true,
};

const app: Application = express();
app.use(cors(target));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth/", authRoute);
app.use("/api/", productRoute);
app.use("/api/", cartRoute);

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Server running on port  http://localhost:${PORT}`);
});
