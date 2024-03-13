const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const userRouter = require("./routes/user.js");
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(userRouter);

const port = 4000;
app.listen(port, () => {
  console.log("Server is running on port", port);
});

// const { getUser } = require("./route/get-user");
// const { signUp } = require("./route/sign-up");
// const { signIn } = require("./route/sign-in");
// const { deleteUser } = require("./route/delete-user");

// const { Pool } = require("pg");

// /////////////////////////////////////////////////////////////////////////////////
// router.get("/user-get", getUser);
// router.post("/signup", signUp);
// router.post("/signin", signIn);
// router.delete("/user-del", deleteUser);

// app.use(router);
// /////////////////////////////////////////////////////////////////////////////////
