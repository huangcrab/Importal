const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateAddAgentInput(data) {
  let errs = {};

  data.email = !isEmpty(data.email) ? data.email : "";

  if (Validator.isEmpty(data.email)) {
    errs.email = "Email field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errs.email = "Email is invalid";
  }

  return {
    errs,
    isValid: isEmpty(errs)
  };
};
