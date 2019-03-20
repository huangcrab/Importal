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
  validation: [
    {
      education: {
        type: Number,
        required: true
      },
      employment: {
        type: Number,
        required: true
      }
    }
  ],
  validationTest: {
    type: Object,
    required: true
  }
});

module.exports = ApplicationForm = mongoose.model(
  "applicationForm",
  ApplicationFormSchema
);
