const { Pool } = require("pg");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
// require("dotenv").config();

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

// async function getPgVersion() {
//   const client = await pool.connect();

//   try {
//     const result = await client.query(
//       "CREATE TABLE transaction (id PRIMARY KEY DEFAULT , user_id FOREIGN KEY, amount REAL NOT NULL, transaction_type ENUM ,description TEXT, createdAt TIMESTAMP , updatedAt TIMESTAMP , category_id FOREIGN KEY)"
//     );

//     // console.log(result.rows[0]);
//   } finally {
//     client.release();
//   }
// }

// getPgVersion();

// async function getPgVersion() {
//   const client = await pool.connect();

//   try {
//     const result = await client.query("ALTER TABLE users ADD avatar_img BLOB");

//     // console.log(result.rows[0]);
//   } finally {
//     client.release();
//   }
// }

// getPgVersion();

app.post("/col-add", async (req, res) => {
  const client = await pool.connect();
  const Query = "ALTER TABLE users ADD avatar_img TINYBLOB";
  try {
    await client.query(Query);
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
    console.log("user added successfully");
  }

  res.status(200).send({ message: "User Added successfully from fe" });
});

app.post("/user-add", async (req, res) => {
  const newUser = req.body;
  console.log(newUser);
  const client = await pool.connect();
  const Query = `INSERT INTO users (name,  email, id ,password) VALUES ('${newUser.name}','${newUser.email}','${newUser.id}','${newUser.password}'); `;
  try {
    await client.query(Query);
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
    console.log("user added successfully");
  }
  console.log("query", Query);
  res.status(200).send(Query);
});

app.delete("/user-delete", async (req, res) => {
  const deleteUser = req.body;
  console.log("requ", deleteUser.name);
  const client = await pool.connect();
  const Query = `DELETE FROM users WHERE name='${deleteUser.name}'`;

  try {
    client.query(Query);
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
    console.log("user deleted");
  }
  res.status(200).send({ message: "User Delete is successfully" });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/user-get", async (req, res) => {
  const allUser = req.body;
  console.log("getting alluser", allUser);
  const client = await pool.connect();
  const Query = "SELECT * FROM users;";

  try {
    const result = await client.query(Query);
    res.status(200).send({ message: result.rows });
    console.log("result", result);
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
    console.log("user get");
  }
});

const port = 4000;
app.listen(port, () => {
  console.log("Server is running on port", port);
});
