const { db } = require("../config/db");

const getAllUsers = async () => {
  const query = "SELECT * FROM users;";
  const res = await db.query(query);
  return res.rows;
};

const createUser = async ({ name, email }) => {
  const query = "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *;";
  const res = await db.query(query, [name, email]);
  return res.rows[0];
};

module.exports = { getAllUsers, createUser };
