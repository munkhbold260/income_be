const userRouter = require("express").Router();
const { getUsers } = require("../service/user-service");

userRouter.get("/user-get", async (req, res) => {
  const users = await getUsers();
  res.json(users);
});

userRouter.post("/signin", async (req, res) => {});

module.exports = userRouter;
