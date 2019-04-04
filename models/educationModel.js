const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EducationSchema = new Schema({
  title: String,
  school: String,
  major: String,
  from: Date,
  to: Date,
  current: Boolean
});

exports.model = mongoose.model("educations", EducationSchema);
