import express from "express";
import { connectDb } from "./config/db.js";
import dotenv from "dotenv";
import path from "path";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json());

if (process.env.NODE_ENV === "production") {
  console.log("production", process.env.NODE_ENV);
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.use("/api/products", productRoutes);
app.listen(PORT, () => {
  connectDb();
  console.log("server started at http://localhost:" + PORT);
});
