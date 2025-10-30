import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import ENV from "../config/env.js";

const { UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN } = ENV;

// Connexion to Upstash Redis
const redis = new Redis({
  url: UPSTASH_REDIS_REST_URL,
  token: UPSTASH_REDIS_REST_TOKEN,
});

// Create rate Limiter : 30 requests / 1 minute by IP
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(30, "60 s"),
  analytics: true,
});

export const rateLimiterMiddleware = async (req, res, next) => {
  try {
    const ip = req.ip || "global";
    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return res.status(429).json({
        message: "Trop de requêtes. Réessaye dans quelques secondes 🚫",
      });
    }

    next();
  } catch (error) {
    console.error("Rate limiter error:", error);
    next(); //
  }
};
