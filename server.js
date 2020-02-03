const express = require("express");
const helmet = require("helmet");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);
const server = express();

const usersRouter = require("./API/users/users_routers");
const campaignsRouter = require("./API/campaigns/campaigns_routers");
const authRouter = require("./API/auth/auth_router");
const { protected } = require("./API/validation");

server.use(express.json());
server.use(helmet());
server.use(logger);

server.use(
  session({
    name: "session_cookie",
    secret: "secret key to encrypt",
    cookie: {
      maxAge: 1000 * 60 * 60,
      secure: false, // https only?
      httpOnly: false // can we get it from JS?
    },

    resave: false,
    saveUninitialized: true, // gdpr
    store: new KnexSessionStore({
      knex: require("./database/db_config.js"), // configured instance of knex
      tablename: "sessions", // table that will store sessions inside the db, name it anything you want
      sidfieldname: "sid", // column that will hold the session id, name it anything you want
      createtable: true, // if the table does not exist, it will create it automatically
      clearInterval: 1000 * 60 // time it takes to check for old sessions and remove them from the database to keep it clean and fast
    })
  })
);
server.use("/api/auth/", authRouter);
server.use("/api/users", usersRouter);
server.use("/api/campaigns", protected, campaignsRouter);
var moment = require("moment");
moment().format();

function logger(req, res, next) {
  console.log(
    `Request method: ${req.method} | Url:  /5600${
      req.url
    } | Date: ${moment().format("MMMM Do YYYY, h:mm:ss a")}`
  );
  next();
}

server.get("*", (req, res) => {
  res.json("api is up");
});

module.exports = server;
