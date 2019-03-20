const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  sex: {
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
      title: {
        type: String,
        require: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date,
        required: true
      },
      current: {
        type: Boolean,
        default: false
      }
    }
  ],
  education: [
    {
      major: {
        type: String,
        required: true
      },
      school: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date,
        required: true
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profiles", ProfileSchema);
