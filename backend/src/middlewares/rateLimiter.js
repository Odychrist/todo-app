import rateLimit from "express-rate-limit";
import { ip as getIp } from "address";

const ipKeyGenerator = (req) => {
  return (
    req.ip ||
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.connection.remoteAddress ||
    "unknown"
  );
};

// Limite pour les routes d'auth
export const authLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // 5 tentatives par minute
  message: "Too many attempts. Please wait a moment.",
  keyGenerator: ipKeyGenerator,
});

// Limite pour les opérations utilisateur
export const userLimiter = rateLimit({
  windowMs: 10 * 1000, // 10 secondes
  max: 10, // 10 actions par 10s
  message: "Too many requests. Slow down.",
  keyGenerator: (req) => {
    return req.user?.userId || ipKeyGenerator(req);
  },
});
