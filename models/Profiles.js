const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  gender: {
    type: String,
    required: true
  },
  birthCity: {
    type: String,
    required: true
  },
  birthCountry: {
    type: String,
    required: true
  },
  birthday: {
    type: Date,
    required: true
  },
  citizenship: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  maritalStatus: {
    type: String,
    required: true
  },
  employment: [
    {
      type: Schema.Types.ObjectId,
      ref: "employments"
    }
  ],
  education: [
    {
      type: Schema.Types.ObjectId,
      ref: "educations"
    }
  ],
  createAt: {
    type: Date,
    default: Date.now
  }
});

exports.model = mongoose.model("profiles", ProfileSchema);
