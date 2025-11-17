import rateLimit, { ipKeyGenerator } from "express-rate-limit";

// Crée le middleware **une seule fois**
const apiRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60,
  keyGenerator: (req) => req.user?.userId || ipKeyGenerator(req),
  message: "Too many requests. Please try again in a few seconds 🚫",
  standardHeaders: true,
  legacyHeaders: false,
});

export default apiRateLimiter;
