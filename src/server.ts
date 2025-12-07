import "reflect-metadata";
import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/DB_config";
import authRoute from "./routes/user/auth-route";
import { productRoute } from "./routes/product/product-route";
import cartRoute from "./routes/cart/cart-route";
import cookieParser from "cookie-parser";

dotenv.config();
connectDB();

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth/", authRoute);
app.use("/api/", productRoute);
app.use("/api/", cartRoute);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "API working 🚀" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port  http://localhost:${PORT}`);
});
