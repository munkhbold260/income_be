const userRouter = require("express").Router();
const { getUsers, loginUser, signUp } = require("../service/user-service");

/////////////////////////////////////////////////////////////////////
userRouter.get("/user-get", async (req, res) => {
  const users = await getUsers();
  res.json(users); ////====>sending to frontend from data base
  // console.log(users);
});
/////////////////////////////////////////////////////////////////////
userRouter.post("/signin", async (req, res) => {
  const user = req.body;
  console.log("req.body", user);
  const login = await loginUser();
  res.json(login);
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

/////////////////////////////////////////////////////////////////////

module.exports = userRouter;
