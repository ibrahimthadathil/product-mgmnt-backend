import "reflect-metadata";
import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/DB_config";
import authRoute from "./routes/user/auth-route";

dotenv.config();
connectDB();

const app: Application = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth/", authRoute);

// app.get("/", (req: Request, res: Response) => {
//   res.status(200).json({ message: "API working 🚀" });
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port  http://localhost:${PORT}`);
});
