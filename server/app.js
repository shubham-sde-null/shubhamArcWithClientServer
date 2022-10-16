const dotenv = require("dotenv");
const express = require("express");
const User = require("./models/userSchema");
const app = express();
dotenv.config({ path: "./configuration/config.env" });
require("./db/conn");
app.use(express.json());
app.use(require("./router/auth"));
app.get("/", (req, res) => {
  res.send("<h1> Hello New Project Started </h1>");
});

// JWT TOKEN

// This Code is to generate token
const SECRET_KEY = process.env.SECRET;
const jwt = require("jsonwebtoken");
const createToken = async () => {
  const token = await jwt.sign({ _id: "626f7174ac7de3a62ecd37ef" }, SECRET_KEY);
  console.log(token);

  // This code is to verify the user whether it is real or not
  const userVerify = await jwt.verify(token, SECRET_KEY);
  console.log(userVerify);
};
createToken();

// JWT TOKEN END

app.listen(process.env.PORT, "127.0.0.1", () => {
  console.log(`server started at port number ${process.env.PORT}`);
});
