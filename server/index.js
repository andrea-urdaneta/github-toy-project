const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const cors = require("cors");

//routes
const authRoutes = require("./routes/auth.js");

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/auth", authRoutes);

var listener = app.listen(5000, function () {
  console.log("Listening on port " + listener.address().port); //Listening on port 8888
});
