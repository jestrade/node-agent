import UserService from "../../services/user-service.js";

export const getUsers = async (req, res) => {
  const { page = 0, total = 10 } = req.query;

  try {
    const userService = new UserService();
    const { users, count } = await userService.getUsers(page, total);

    res.json({ ok: true, users, count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: String(err) });
  }
};
