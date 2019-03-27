const express = require("express");
const router = express.Router();
const Agent = require("../../models/Agents");
const passport = require("passport");
const roleCheck = require("../../controllers/roleCheck");

const validateAddAgentInput = require("../../validation/addAgent");

//POST /agents/add
//Add Agents
//PRIVATE
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  roleCheck.roleCheck(["admin"]),
  (req, res) => {
    const email = req.body.email;

    const { errs, isValid } = validateAddAgentInput(req.body);

    if (!isValid) {
      return res.status(400).json(errs);
    }

    Agent.findOne({ email }).then(agent => {
      if (agent) {
        errs.email = "Email already exist";
        return res.status(400).json(errs);
      }

      const newAgent = new Agent({
        email
      });

      newAgent.save(agent => res.json(agent)).catch(err => console.log(err));
    });
  }
);

module.exports = router;
