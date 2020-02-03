const db = require("../../database/db_config");

function get() {
  return db("users");
}

function getById(id) {
  return db("users")
    .where({ id })
    .first();
}

function getByEmail(filter) {
  return db("users")
    .where(filter)
    .first();
}

function insert(user) {
  return db("users")
    .insert(user)
    .then(ids => {
      return getById(ids[0]);
    });
}

module.exports = {
  get,
  getById,
  insert,
  getByEmail
};
