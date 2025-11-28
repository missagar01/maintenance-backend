import { findUserByCredentials } from "../services/authServices.js";

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username)
      return res.status(400).json({ success: false, message: "Username or ID is required" });

    const user = await findUserByCredentials(username, password);

    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    const userData = {
      id: user.id,
      name: user.username,
      role: user.role,
      page_access: user.page_access, // ✅ send exact array
    };

    return res.status(200).json({ success: true, user: userData });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

