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
exports.getUser = async (req, res) => {
  const allUser = req.body;
  // console.log("getting alluser", allUser);
  const client = await pool.connect();
  const Query = "SELECT * FROM users;";
  try {
    const result = await client.query(Query);
    res.status(200).send({ message: result.rows });
    // console.log("result", result);
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
    console.log("user get");
  }
};
