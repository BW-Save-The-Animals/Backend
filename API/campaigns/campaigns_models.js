const db = require("../../database/db_config");

// Filter by location, species.

async function get(query = {}) {
  const { limit = 10, sortby = "id", sortdir = "asc" } = query;
  const { location = "" } = query;

  let rows = await db("campaigns")
    .orderBy(sortby, sortdir)
    .limit(limit)
    .modify(function(queryBuilder) {
      if (location) {
        queryBuilder.where({ location });
      }
    });
  console.log(query);

  return rows;
}

function getUserCampaigns(id) {
  return db("campaigns").where({ user_id: id });
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
  update,
  getUserCampaigns
};
