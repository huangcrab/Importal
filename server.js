const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const agents = require("./routes/api/agents");
const profiles = require("./routes/api/profiles");

const app = express();

app.use(bodyParser.json());
const PORT = process.env.PORT || 6000;

//passport middleware
app.use(passport.initialize());
//passport config
require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/agents", agents);
app.use("/api/profiles", profiles);

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
