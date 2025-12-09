import User from "../models/user.model.js";

export const getUserData = async (req, res) => {
  try {
    const userId = req.user.userId;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "Unauthorized. Login again." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      data: {
        name: user.name,
      },
    });
  } catch (error) {
    console.log("Error in getUserData controller", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
