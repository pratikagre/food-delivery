import express from "express";
import cors from "cors";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
connectDB();
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// ✅ Serve uploads
app.use("/images", express.static("uploads"));

// ✅ Serve frontend & admin builds
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.use("/admin", express.static(path.join(__dirname, "../admin/dist")));

app.get("*", (req, res) => {
  if (req.path.startsWith("/admin")) {
    res.sendFile(path.join(__dirname, "../admin/dist/index.html"));
  } else {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  }
});

app.listen(port, () => console.log(`Server Started on port: ${port}`));
