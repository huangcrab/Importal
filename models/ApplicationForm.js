const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ApplicationFormSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  validation: {
    type: Object,
    required: true
  },
  fields: {
    type: Object,
    required: true
  },
  createAt: {
    type: Date,
    default: Date.now
  }
});

exports.model = mongoose.model("applicationForm", ApplicationFormSchema);
