const db = require("../../database/db_config");

// Filter by location, species, description.

async function get(query = {}) {
  const { limit = 10, sortby = "id", sortdir = "asc" } = query;
  const {
    location = "",
    urgency_level = 0,
    funding_goal = 0,
    deadline = "",
    title = "",
    description = "",
    specie_id = 0
  } = query;

  let rows = await db("campaigns")
    .orderBy(sortby, sortdir)
    .limit(limit)
    .modify(function(queryBuilder) {
      if (location) {
        queryBuilder.where({ location });
      }
      if (urgency_level) {
        queryBuilder.where({ urgency_level });
      }
      if (funding_goal) {
        queryBuilder.where({ funding_goal });
      }
      if (deadline) {
        queryBuilder.where({ deadline });
      }
      if (title) {
        queryBuilder.where("title", "like", "%" + title + "%");
      }
      if (description) {
        queryBuilder.where("description", "like", "%" + description + "%");
      }
      if (specie_id) {
        queryBuilder.where({ specie_id });
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

function remove(id) {
  return db("campaigns")
    .where("id", id)
    .del();
}

module.exports = {
  get,
  getById,
  insert,
  update,
  getUserCampaigns,
  remove
};
