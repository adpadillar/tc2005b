const { Pool } = require("pg");

const dotenv = require("dotenv");
dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("Missing DATABASE_URL in environment");
}

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = { db };
