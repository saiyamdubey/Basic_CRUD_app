const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const mongoose = require("mongoose");
const path = require("path");
const { userRouter } = require("./routes/user");

const port = process.env.PORT || 3000;
const URL = process.env.SECRET_ACCESS_KEY; // ADD your mongoDB url 

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(URL);

app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Sever is working on http://localhost:${port}`);
});
