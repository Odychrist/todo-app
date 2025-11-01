import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcryptjs from "bcrypt";
import ENV from "../config/env.js";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";
// import jwt from "jsonwebtoken";

const { NODE_ENV, JWT_EXPIRES_IN, JWT_SECRET } = ENV;

export const register = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Récupérer les informations fournies par l'utilisateur
    const { name, email, password } = req.body;

    // Vérifier si l'utilisateur a renseigné tous les champs
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Vérifier sil'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Hasher le mot de passe de l'utilisateur
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Créer l'utilisateur
    const user = new User({ name, email, password: hashedPassword });
    const newUser = await user.save({ session });

    // Passer le token d'inscription
    generateTokenAndSetCookie(res, newUser._id);
    /* const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    }); */

    // Prendre l'utilisateur sans le mot de passe
    const renderUser = newUser.toObject();
    delete renderUser.password;

    // Valider la session
    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        renderUser,
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error in register controller", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }

    generateTokenAndSetCookie(res, user._id);
    /* const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    }); */
    return res
      .status(200)
      .json({ success: true, message: "User connected successfully" });
  } catch (error) {
    console.error("Error in login controller", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });

    return res
      .status(200)
      .json({ success: true, message: "Logged Out successfully" });
  } catch (error) {
    console.error("Error in logout controller", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
