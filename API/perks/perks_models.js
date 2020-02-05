const db = require("../../database/db_config");

function getById(id) {
  return db("perks")
    .where({ id })
    .first();
}

function insert(perk) {
  return db("perks")
    .insert(perk)
    .then(ids => {
      return getById(ids[0]);
    });
}

function getByCampaign_Id(id) {
  return db("perks").where({ campaign_id: id });
}
module.exports = {
  insert,
  getByCampaign_Id
};