const express = require("express");
const helmet = require("helmet");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const cookieParser = require("jwt");
const { version, description } = require("./package.json"); //used in swagger options

const server = express();

const usersRouter = require("./API/users/users_routers");
const campaignsRouter = require("./API/campaigns/campaigns_routers");
const authRouter = require("./API/auth/auth_router");
const speciesRouter = require("./API/species/species_routers");
const { restricted } = require("./API/validation");

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

// server.use(cookieParser())

server.use(
	cors({
		credentials: true,
		origin: [
			"http://localhost:3000",
			"http://silky-playground.surge.sh"
		]
	})
);

const swaggerDefinition = {
  info: {
    title: "Save The Animals",
    version,
    description
  },
  host: "localhost:5600",
  baseUrl: "/api"
};

const options = {
  swaggerDefinition,
  apis: ["./API/*.js"]
};

const swaggerSpec = swaggerJsDoc(options);

server.use("/api/auth/", authRouter);
server.use("/api/users", restricted, usersRouter);
server.use("/api/campaigns", restricted, campaignsRouter);
server.use("/api/species", speciesRouter);

var moment = require("moment");
moment().format();

server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
