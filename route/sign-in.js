const { Pool } = require("pg");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const pgConfig = {
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: {
    require: true,
  },
};

const pool = new Pool(pgConfig);
/////////////////////////////////////////////////////////////////////////////////
exports.signIn = async (req, res) => {
  const user = req.body;
  console.log(user);
  const client = await pool.connect();
  const Query = `SELECT * FROM users WHERE (email='${user.email}' AND password='${user.password}');`;
  // const Query = `INSERT INTO users (name,  email, id ,password) VALUES ('${user.email}','${user.password}'); `;
  try {
    const dbResponse = await client.query(Query);
    if (dbResponse["rowCount"]) {
      return res.status(200).send({ success: "true" });
    } else {
      return res.status(500).send({ success: "false" });
    }
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
    console.log("signin successfully");
  }
};
