const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const { model: Profile } = require("../../models/Profiles");
const passport = require("passport");
const key = require("../../config/keys");
const roleCheck = require("../../controllers/roleCheck");

const validateLoginInput = require("../../validation/login");

//@route     GET api/profiles/
//@desc      get current users profile
//@access    PRIVATE
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errs = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errs.noprofile = "There is no profile for this user";
          return res.status(404).json(errs);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

router.get(
  "/rolecheck",
  passport.authenticate("jwt", { session: false }),
  roleCheck.roleCheck(["admin"]),
  (req, res) => {
    return res.json({
      data: "RoleCheck"
    });
  }
);

router.get(
  "/norolecheck",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.json({
      data: "noRoleCheck"
    });
  }
);

module.exports = router;
