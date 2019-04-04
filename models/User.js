const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserScheme = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  role: {
    type: String,
    enum: ["vip", "admin", "agent"],
    default: "vip"
  },
  createAt: {
    type: Date,
    default: Date.now
  }
});

exports.model = mongoose.model("users", UserScheme);
