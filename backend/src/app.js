import express from "express";
import ENV from "./config/env.js";
import cors from "cors";
import connectToDatabase from "./database/mongodb.js";
import taskRoute from "./routes/task.routes.js";
import apiRateLimiter from "./middlewares/rateLimiter.js";
import path from "path";
import authRoute from "./routes/auth.routes.js";
import authorize from "./middlewares/auth.middleware.js";
import cookieParser from "cookie-parser";

const app = express();
const { NODE_ENV, PORT } = ENV;

// Gestion des chemins : utile pour le déploiement

const __dirname = path.resolve();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
// app.use("/api", authorize, apiRateLimiter);

// Routes
app.use("/api/tasks", authorize, taskRoute);
app.use("/api/auth", authRoute);

// En production, servir les fichiers React buildés
if (NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/dist");
  app.use(express.static(frontendPath));

  app.get("/*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`Server is running in PORT ${PORT} at ${NODE_ENV}.`);
});
