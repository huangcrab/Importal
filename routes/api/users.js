const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const key = require("../../config/keys");

//load input validation
const validateLoginInput = require("../../validation/login");
const validateRegisterInput = require("../../validation/register");

//  POST api/users/login
//  Login User / return token
//  PUBLIC
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const { errs, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errs);
  }

  User.findOne({ email }).then(user => {
    if (!user) {
      errs.email = "User not Found";
      return res.status(404).json(errs);
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //generate token
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar
        };
        jwt.sign(payload, key.secret, { expiresIn: 3600 }, (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token
          });
        });
      } else {
        errs.password = "Password is not correct";
        return res.status(404).json(errs);
      }
    });
  });
});

//  POST api/users/register
//  Login User / return token
//  PUBLIC
router.post("/register", (req, res) => {
  const { errs, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errs);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errs.email = "Email already exist";
      return res.status(400).json(errs);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar: avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

module.exports = router;
