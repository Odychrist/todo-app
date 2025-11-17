import jwt from "jsonwebtoken";
import ENV from "../config/env.js";

const { JWT_SECRET, JWT_EXPIRES_IN, NODE_ENV } = ENV;

const generateTokenAndSetCookie = (res, id) => {
  // Générer un token
  const token = jwt.sign({ userId: id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  // console.log(token);
  // Passer le token comme cookies
  res.cookie("token", token, {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });
};

export default generateTokenAndSetCookie;
