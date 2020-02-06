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

function total_Perks_Per_Campaign(id) {
  
}


function total_Donations_Per_Campaigns(params) {
  
}


/*SELECT users_perks.user_id,SUM(perks.amount),
users_perks.perk_id,
perks.amount,perks.title,
perks.campaign_id
from users_perks
JOIN perks
ON users_perks.perk_id=perks.id
group by perks.campaign_id*/

// select donations.campaign_id,
// donations.donation_amount,
// sum(donations.donation_amount)
// from donations
// group by donations.campaign_id







module.exports = {
  get,
  getById,
  insert,
  update,
  getUserCampaigns,
  remove
};
