const { Pool } = require("pg");

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT } = process.env;

const pgConif = {
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: PGPORT,
  ssl: {
    require: true,
  },
};

const pool = new Pool(pgConif);
/////////////////////////////////////////////////////////////////////
async function getUsers() {
  const client = await pool.connect();
  let response;
  try {
    response = await client.query("SELECT * FROM users");
  } catch (error) {
    throw new Error(error ? error.message : "Error");
  } finally {
    client.release();
  }
  // console.log(response.rows);
  return response.rows; /// =====> data base-s irseniig routeruu ilgeej bn
}
/////////////////////////////////////////////////////////////////////
async function loginUser(req, res) {
  console.log("uusseeerrrrrr", res);
  // // const user = res.body;
  // const client = await pool.connect();
  // let response;
  // const Query = `SELECT * FROM users WHERE (email='${user.email}' AND password='${user.password}');`;
  // // const Query = `INSERT INTO users (name,  email, id ,password) VALUES ('${user.email}','${user.password}'); `;
  // try {
  //   response = await client.query(Query);
  //   const dbResponse = await client.query(Query);
  //   const result = res.send(dbResponse.rows[0]);
  //   if (dbResponse["rowCount"]) {
  //     return res.status(200).send({ success: result });
  //   } else {
  //     return res.status(500).send({ success: "false" });
  //   }
  // } catch (e) {
  //   console.log(e);
  // } finally {
  //   client.release();
  //   console.log("signin successfully");
  // }
}
/////////////////////////////////////////////////////////////////////
async function signUp(newUser) {
  const client = await pool.connect();
  let response;
  try {
    response = await client.query(
      "INSERT INTO users (name, email, password,id) VALUES ($1, $2, $3, $4)",
      [newUser.name, newUser.email, newUser.password, newUser.id]
    );
  } catch (error) {
    throw new Error(error ? error.message : "Error");
  } finally {
    client.release();
  }
  return response.rows;
}
/////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////

module.exports = { getUsers, loginUser, signUp };
