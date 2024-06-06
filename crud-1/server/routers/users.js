const { Router } = require("express");
const { getAllUsers, createUser, getUserById } = require("../model/users");
const { unwrap, failed } = require("../utils");

const usersRouter = Router();

usersRouter.get("/", async (req, res) => {
  const users = await unwrap(getAllUsers);

  if (failed(users)) {
    return res.status(500).json({ error: users.message });
  }

  res.json(users);
});

usersRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await unwrap(getUserById, id);

  if (failed(user)) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
});

usersRouter.post("/", async (req, res) => {
  const { name, email } = req.body;
  const newUser = await unwrap(createUser, { name, email });

  if (failed(newUser)) {
    return res.status(400).json({ error: newUser.message });
  }

  res.json(newUser);
});

module.exports = usersRouter;
