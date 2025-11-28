export const attachUser = (req, res, next) => {
  const username = req.headers["x-user"];

  if (!username) {
    return res.status(401).json({ success: false, message: "User header missing" });
  }

  req.user = { username, role: req.headers["x-role"] || "user" };
  next();
};
