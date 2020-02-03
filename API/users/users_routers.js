const express = require("express");
const Users = require("./users_models");
const router = express.Router();
const { validateUserId, validateUser } = require("../validation");

router.get("/", (req, res) => {
  Users.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({
        message: error
      });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

module.exports = router;
