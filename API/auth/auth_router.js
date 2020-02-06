const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("../users/users_models");
const jwt = require("jsonwebtoken");
const { validateUser, validateEmail } = require("../validation");

function makeToken(user, res) {
  // make a "payload" object

  const payload = {
    sub: user.id,
    user: user
  };
  // make an "options" object (exp)
  const options = {
    expiresIn: "1d"
  };
  // use the lib to make the token
  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET || "thesecret",
    options
  );
  return res.cookie("token", token, {
    expiresIn: 1000 * 60 * 60,
    httpOnly: true,
    secure: false
  });
  // return token;
}

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
      console.log(error);

      res.status(500).json({ message: "Failed to create user" });
    });
});

router.post("/login", (req, res) => {
  Users.getByEmail({ email: req.body.email })
    .first()
    .then(user => {
      // console.log("found", user);
      if (user && bcrypt.compareSync(req.body.password, user.password)) {
        //  req.decodedToken.user = user;
        makeToken(user, res);
        res.status(200).json({
          message: "Logged in",
          id: user.id,
          type: user.user_type
        });
      } else {
        res.status(401).json({
          message: "Invalid username or password"
        });
      }
    })
    .catch(error => {
      console.log(error);

      res.status(500).json({ message: "Failed to login" });
    });
});

router.get("/logout", (req, res) => {
  // req.session.destroy();
  res.status(200).json({ message: "bye bye" });
});

module.exports = router;
