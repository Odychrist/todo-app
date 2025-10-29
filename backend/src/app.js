import express from "express";
import ENV from "./config/env.js";
import cors from "cors";
import connectToDatabase from "./database/mongodb.js";
import taskRoute from "./routes/task.routes.js";
import { rateLimiterMiddleware } from "./middleware/rateLimiter.js";
import path from "path";
// import { fileURLToPath } from "url";

const app = express();
const { NODE_ENV, PORT } = ENV;

// Gestion des chemins : utile pour le déploiement

const __dirname = path.resolve();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(rateLimiterMiddleware);

// Routes
app.use("/api/tasks", taskRoute);

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
