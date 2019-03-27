const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//create Agent shema
const AgentSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Agents = mongoose.model("agents", AgentSchema);
