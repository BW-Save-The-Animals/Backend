const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("../users/users_models");
const { validateUser, validateEmail } = require("../validation");

/**
 * @swagger
 * /auth/register:
 *  post:
 *    summary: Create a new user account
 *    description: Create a new user account
 *    tags: [Auth]
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: user
 *        description: The user to create
 *        schema:
 *          type: object
 *          required:
 *            - name
 *            - email
 *            - password
 *            - user_type
 *            - about
 *          properties:
 *            name:
 *              type: string
 *            email:
 *              type: string
 *            password:
 *              type: string
 *            about:
 *              type: string
 *            user_type:
 *              type: integer
 *    responses:
 *      201:
 *        description: returns the newly-created user
 *        schema:
 *          $ref: '#/definitions/User'
 *      400:
 *        description: returned if any of `email`, `name`, `password`, `user_type`, or `about` are
 *                     missing or of incorrect data type.
 *      500:
 *        description: returned in the event of a server error
 */

router.post("/register", validateUser, validateEmail, (req, res) => {
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
        res.status(401).json({
          message: "Invalid username or password"
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
