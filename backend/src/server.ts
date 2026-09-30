import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import s3TestRouter from "./routes/s3Routes.js";
import uploadRouter from "./routes/upload.js";
import downloadRouter from "./routes/download.js";
import filesRouter from "./routes/files.js";
import deleteRouter from "./routes/delete.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Backend is running"
  });
});

app.use("/api", s3TestRouter);
app.use("/api", uploadRouter);
app.use("/api", downloadRouter);
app.use("/api", filesRouter);
app.use("/api", deleteRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});