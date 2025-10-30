import jwt from "jsonwebtoken";
import ENV from "../config/env.js";

const { JWT_SECRET } = ENV;

/* const authorize = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json({ success: false, message: "Not authorized. Login again" });
  }

  try {
    const tokenDecode = jwt.verify(token, JWT_SECRET);
    if (tokenDecode.userId) {
      req.user = { userId: tokenDecode.userId };
    } else {
      return res.json({
        success: false,
        message: "Not authorized. Login again",
      });
    }

    next();
  } catch (error) {
    console.error("Error in authorize middleware", error);
    return res.status(500).json({ success: "Internal server error" });
  }
}; */

const authorize = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized. Login again" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error in authorize middleware", error);
    return res.status(500).json({ success: "Internal server error" });
  }
};
export default authorize;
