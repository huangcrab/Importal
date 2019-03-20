const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: "profiles"
  },
  applicationForm: {
    type: Schema.Types.ObjectId,
    ref: "applicationForm"
  },
  status: {
    type: String,
    required: true
  }
});

module.exports = Application = mongoose.model(
  "applications",
  ApplicationSchema
);
