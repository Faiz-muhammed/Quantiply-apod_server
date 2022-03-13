const express = require("express");
const cors = require("cors");
const env = require("dotenv");
const db = require("./config/connection");
const astronomyRoute = require("./routes/apodRoute");

env.config();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: [], credentials: true }));

db.connect((err) => {
  if (err) {
    console.error("Error occured while connecting database");
    console.error(err);
  } else {
    console.log("Database connected successfully");
  }
});

app.use("/astronomy",astronomyRoute);

app.listen(PORT, (err) => {
  err
    ? console.error("Port configuring error:", err)
    : console.log(`lstening at:${PORT}`);
});

module.exports = app;
