import express from "express";
import { User } from "../user";

export const usersRouter = express.Router();

usersRouter.get("/", async (req, res) => {
  try {
    const users = await User.all();
    res.json(users.map((user) => user.data));
  } catch (error) {
    res.status(500).json({ error: "Error fetching all users" });
  }
});

usersRouter.get("/:id", async (req, res) => {
  try {
    const user = await User.get(parseInt(req.params.id));
    res.json(user.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user" });
  }
});

usersRouter.post("/", async (req, res) => {
  try {
    const user = await User.new(req.body);
    res.json(user.data);
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
});
