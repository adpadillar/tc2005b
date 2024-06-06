const { db } = require("../config/db");

const getAllDescriptions = async () => {
  const query = "SELECT * FROM descriptions;";
  const res = await db.query(query);
  return res.rows;
};

const getDescriptionById = async (id) => {
  const query = "SELECT * FROM descriptions WHERE id = $1;";
  const res = await db.query(query, [id]);
  return res.rows[0];
};

const createDescription = async ({ description }) => {
  const query =
    "INSERT INTO descriptions (description) VALUES ($1) RETURNING *;";
  const res = await db.query(query, [description]);
  return res.rows[0];
};

module.exports = { getAllDescriptions, createDescription, getDescriptionById };
