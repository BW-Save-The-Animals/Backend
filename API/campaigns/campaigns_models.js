const db = require("../../database/db_config");

function get() {
  return db("campaigns");
}

function getById(id) {
  return db("campaigns")
    .where({ id })
    .first();
}

function insert(campaign) {
  return db("campaigns")
    .insert(campaign)
    .then(ids => {
      return getById(ids[0]);
    });
}

function update(campaign, id) {
  return db("campaigns")
    .where({ id })
    .update(campaign);
}

module.exports = {
  get,
  getById,
  insert,
  update
};
