//// all those users need to be user_type :2 , and be companies.Only they can start campaigns.

exports.seed = async knex => {
  await knex("users_campaigns").insert([
    {
      id: 1,
      user_id: 5,
      campaign_id: 3
    },
    {
      id: 2,
      user_id: 6,
      campaign_id: 2
    },
    {
      id: 3,
      user_id: 5,
      campaign_id: 1
    }
  ]);
};
