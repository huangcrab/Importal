const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const users = require("./routes/api/users");

const app = express();

const PORT = process.env.PORT || 6000;

app.use(bodyParser.json());

app.use("/api/users", users);

let db;
if (process.env.NODE_ENV === "production") {
  db = require("./config/keys").mongoURI;
} else {
  db = require("./config/keys").local;
}

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("Mongodb Connected");
  })
  .catch(err => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
