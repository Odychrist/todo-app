import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { getUserData } from "../controllers/user.controller.js";

const userRoute = Router();

userRoute.get("/data", authorize, getUserData);

export default userRoute;
