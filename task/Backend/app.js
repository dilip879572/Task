var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
require("./config/db.js");

var app = express();
const userRoute = require("./routes/user.route.js");
const customerRoute = require("./routes/notes.route.js");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/user", userRoute);
app.use("/notes", customerRoute);
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
