import UserService from "../../services/user-service.js";
import axios from "axios";
import { config } from "../../config/index.js";

const userService = new UserService();

export const getUsers = async (req, res) => {
  const { page = 0, total = 10 } = req.query;

  try {
    const { users, count } = await userService.getUsers(page, total);
    res.json({ ok: true, users, count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: String(err) });
  }
};

export const createUser = async (req, res) => {
  const { email, name } = req.body;

  if (!email || !name) {
    return res
      .status(400)
      .json({ ok: false, error: "Email and name are required" });
  }
  const user = await userService.upsertUser(email, name);

  try {
    const webhookUrl = `${config.httpServer.baseUrl}/webhook`;
    await axios.post(webhookUrl, {
      type: "user.created",
      payload: { email, name, id: user.id },
    });

    res.status(202).json({
      ok: true,
      message: "User creation request received",
      data: { email, name, id: user.id },
    });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({
      ok: false,
      error: "Failed to process user creation",
      details: err.message,
    });
  }
};
