import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// APIs
app.use("/api", require("./routes")); // ya jo bhi routes hain

// ✅ FRONTEND SERVE
app.use(express.static(path.join(__dirname, "../admin/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../admin/dist/index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
