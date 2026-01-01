import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import { connectDB } from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";


dotenv.config();
const app = express();

console.log("Loaded MONGO_URI:", !!process.env.MONGO_URI);
console.log("Loaded JWT_SECRET:", !!process.env.JWT_SECRET);

app.use(helmet());
app.use(rateLimit({ windowMs: 1 * 60 * 1000, max: 100 }));
app.use(morgan("dev"));
app.use(cors({ origin: true }));
app.use(express.json());
app.use("/api/auth", authRoutes);

await connectDB(process.env.MONGO_URI);

app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
    res.send("Automotive Parts E-commerce API running");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});