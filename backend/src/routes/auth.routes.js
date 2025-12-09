import { Router } from "express";
import {
  register,
  login,
  logout,
  isAccountVerified,
} from "../controllers/auth.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const authRoute = Router();

authRoute.post("/register", register);
authRoute.post("/login", login);
authRoute.post("/logout", logout);
authRoute.get("/is-auth", authorize, isAccountVerified);

export default authRoute;
