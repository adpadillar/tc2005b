const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { getAllUsers, createUser } = require("./model/users");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/users", async (req, res) => {
  const users = await getAllUsers();
  res.json(users);
});

app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  const newUser = await createUser({ name, email });
  res.json(newUser);
});

app.listen(3000, () => {
  console.log("listening in port 3000");
});
