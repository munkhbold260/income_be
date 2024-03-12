/////////////////////////////////////////////////////////////////////////////////
app.post("/signin", async (req, res) => {
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
});
/////////////////////////////////////////////////////////////////////////////////
// app.post("/login", async (req, res) => {
//   const user = req.body;
//   console.log(user);
//   const client = await pool.connect();
//   const Query = `SELECT * FROM users WHERE (email='${user.email}' AND password='${user.password}');`;

//   try {
//     const dbResponse = await client.query(Query);
//     if (dbResponse["rowCount"]) {
//       return res.status(200).send({ success: "true" });
//     } else {
//       return res.status(500).send({ success: "false" });
//     }
//   } catch (e) {
//     console.log(e);
//   } finally {
//     client.release();
//     console.log();
//   }
// });
/////////////////////////////////////////////////////////////////////////////////
app.post("/col-add", async (req, res) => {
  const client = await pool.connect();
  const Query = "ALTER TABLE users ADD email VARCHAR(50) NOT NULL UNIQUE  ";

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
/////////////////////////////////////////////////////////////////////////////////
app.post("/col-del", async (req, res) => {
  const client = await pool.connect();
  const Query = "ALTER TABLE users DROP COLUMN email ";
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
/////////////////////////////////////////////////////////////////////////////////
app.delete("/user-delete", async (req, res) => {
  const deleteUser = req.body;
  console.log("requ", deleteUser.id);
  const client = await pool.connect();
  const Query = `DELETE FROM users WHERE id='${deleteUser.id}'`;
  console.log(Query);
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
/////////////////////////////////////////////////////////////////////////////////
app.get("/user-get", async (req, res) => {
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
});
/////////////////////////////////////////////////////////////////////////////////
