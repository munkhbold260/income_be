const userRouter = require("express").Router();
const {
  getUsers,
  loginUser,
  signUp,
  deleteUser,
  deleteTable,
  selectCurrency,
} = require("../service/user-service");

/////////////////////////////////////////////////////////////////////
userRouter.get("/user-get", async (req, res) => {
  const users = await getUsers();
  res.json(users); ////====>sending to frontend from data base
  // console.log(users);
});
/////////////////////////////////////////////////////////////////////

userRouter.delete("/user-delete", async (req, res) => {
  const userId = req.body;
  console.log("userId", userId);
  const result = await deleteUser(userId);
  res.json(result);
});

/////////////////////////////////////////////////////////////////////
userRouter.post("/signin", async (req, res) => {
  const user = req.body;
  // console.log("req.body", user); ===>working
  const result = await loginUser(user);
  res.json(result);
  console.log("reeeeeeees", result);
});

/////////////////////////////////////////////////////////////////////
userRouter.post("/signup", async (req, res) => {
  const newUserData = req.body;
  // console.log("newUserDatanewUserData", newUserData);
  const result = await signUp(newUserData);
  res.json(result);
  console.log("reeesssuuult", result);
});
/////////////////////////////////////////////////////////////////////
userRouter.post("/select-currency", async (req, res) => {
  const newCurrency = req.body;
  console.log("req.body======>", req.body);
  const result = await selectCurrency(newCurrency);

  console.log("result", result);
  res.json(result);
});

/////////////////////////////////////////////////////////////////////
userRouter.get("/col-add", async (req, res) => {
  const table = await deleteTable();
  res.json(table);
});
/////////////////////////////////////////////////////////////////////

module.exports = userRouter;
