const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("../users/users_models");
const { validateUser } = require("../validation");

router.post("/register", validateUser, (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 10);

  Users.insert({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    user_type: req.body.user_type,
    about: req.body.about
  })
    .then(saved => {
      delete saved.password;
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json({ message: "Failed to create user" });
    });
});

router.post("/login", (req, res) => {
  Users.getByEmail({ email: req.body.email })
    .first()
    .then(user => {
      // console.log("found", user);
      if (user && bcrypt.compareSync(req.body.password, user.password)) {
        req.session.loggedInUser = user;
        res.status(200).json({ message: "Logged in" });
      } else {
        res.status(200).json({
          message: "You shall not pass!"
        });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Failed to login" });
    });
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.status(200).json({ message: "bye bye" });
});

module.exports = router;
