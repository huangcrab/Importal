const { model: User } = require("../models/User");

exports.roleCheck = function(roles) {
  return function(req, res, next) {
    const user = req.user;

    User.findById(user.id).then(user => {
      if (!user) {
        res.status(422).json({ error: "No user found." });
        return next(err);
      }

      if (roles.indexOf(user.role) > -1) {
        return next();
      }

      res
        .status(401)
        .json({ error: "You are not authorized to view this content" });
      return next("Unauthorized");
    });
  };
};
