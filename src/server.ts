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
import initAdmin from "./script/init-admin";
dotenv.config();
connectDB();

const allowedOrigins = [
  "http://localhost:3000",
  "https://product.luxbid.shop",
];


const app: Application = express();

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                console.log(origin, "origin when cors is used");
                callback(null, origin);
            } else {
                console.log(origin, allowedOrigins, "origin when cors is not used");
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
        methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth/", authRoute);
app.use("/api/", productRoute);
app.use("/api/", cartRoute);

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Server running on port  http://localhost:${PORT}`);
});
