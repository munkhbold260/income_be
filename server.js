const { getUser } = require("./route/get-user");
const { signUp } = require("./route/sign-up");
const { signIn } = require("./route/sign-in");

const { Pool } = require("pg");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

// require("dotenv").config();
dotenv.config();

const app = express();

const router = express.Router();

app.use(cors());
app.use(bodyParser.json());
/////////////////////////////////////////////////////////////////////////////////
router.get("/user-get", getUser);
router.post("/signup", signUp);
router.post("/signin", signIn);

app.use(router);
/////////////////////////////////////////////////////////////////////////////////
const port = 4000;
app.listen(port, () => {
  console.log("Server is running on port", port);
});
