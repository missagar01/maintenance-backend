import {
  getAllUsersService,
  addUserService,
  updateUserService,
  deleteUserService,
} from "../services/userServices.js";

// ➤ GET all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService();
    res.json({ success: true, data: users });
  } catch (err) {
    console.error("Get Users Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ➤ ADD new user
export const addUser = async (req, res) => {
  try {
    const { username, password, role, pageAccess } = req.body;

    if (!username || !password || !role) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    const newUser = await addUserService({
      username,
      password,
      role,
      pageAccess: pageAccess || []
    });

    res.json({ success: true, data: newUser });
  } catch (err) {
    console.error("Add User Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ➤ UPDATE user
export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updated = await updateUserService(userId, req.body);

    res.json({ success: true, data: updated });
  } catch (err) {
    console.error("Update User Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ➤ DELETE user
export const deleteUser = async (req, res) => {
  try {
    await deleteUserService(req.params.id);
    res.json({ success: true, message: "User deleted" });
  } catch (err) {
    console.error("Delete User Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
