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
  return response.rows; /// =====> data base-s irseniig routeruu ilgeej bn
}
/////////////////////////////////////////////////////////////////////
async function deleteUser(user) {
  console.log("requ", user.id);
  const client = await pool.connect();
  const Query = `DELETE FROM users WHERE name='${user.id}'`;
  console.log(Query);
  try {
    client.query(Query);
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
    console.log("user deleted");
  }
  return { message: true };
}
/////////////////////////////////////////////////////////////////////

async function loginUser(user) {
  // console.log("uuuussserLog", userLog);
  const client = await pool.connect();
  const Query = `SELECT * FROM users WHERE (email='${user.email}' AND password='${user.password}');`;

  let response;
  try {
    response = await client.query(Query);
  } catch (e) {
  } finally {
    client.release;
  }
  const userId = response.rows[0];

  if (response["rowCount"]) {
    return userId;
  } else {
    return "false";
  }
}

/////////////////////////////////////////////////////////////////////
async function signUp(newUser) {
  // console.log("newuser", newUser);=== work
  const client = await pool.connect();
  let response;
  try {
    response = await client.query(
      "INSERT INTO users (name, email, password,id) VALUES ($1, $2, $3, $4)",
      [newUser.name, newUser.email, newUser.password, newUser.id]
    );
  } catch (error) {
    // throw new Error(error ? error.message : "Error");//// asaahaar ajillahgui
  } finally {
    client.release();
  }
  console.log("sdsadasdasdasda", response?.rowCount);
  if (response == null) {
    return false;
  } else {
    return true;
  }
}
/////////////////////////////////////////////////////////////////////
async function selectCurrency(currency) {
  console.log("currency=====>", currency);
  const client = await pool.connect();
  let response;

  try {
    response = await client.query(
      `UPDATE users SET currency_type = '${currency.currency}' WHERE id= '${currency.id}'`
    );
  } catch (error) {
  } finally {
    client.release();
  }
  if (response == null) {
    return false;
  } else {
    return true;
  }
}

/////////////////////////////////////////////////////////////////////
async function deleteTable(table) {
  console.log("sdnasdjbsjhdvsejhvfsehgfwehgfv");
  const client = await pool.connect();
  const Query = "ALTER TABLE users ADD currency_type text default 'MNT'";

  // ALTER TABLE users ADD email VARCHAR(50) NOT NULL UNIQUE
  try {
    await client.query(Query);
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
    console.log("user added successfully");
  }
  ({ message: "User Added successfully from fe" });
}
/////////////////////////////////////////////////////////////////////

module.exports = {
  getUsers,
  loginUser,
  signUp,
  deleteUser,
  selectCurrency,
  deleteTable,
};
