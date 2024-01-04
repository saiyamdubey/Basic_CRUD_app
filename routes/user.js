const express = require("express");

const {
  userget,
  userpost,
  userdelete,
  userpatch,
  userput,
} = require("../controllers/user");

const userRouter = express.Router();

userRouter
  .get("/", userget)
  .post("/", userpost)
  .delete("/", userdelete)
  .patch("/", userpatch)
  .put("/", userput);

module.exports = {
  userRouter,
};
