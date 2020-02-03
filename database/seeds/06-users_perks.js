//// all those users need to be user_type :2 , and be companies.Only they can start perks.

exports.seed = async knex => {
  await knex("users_perks").insert([
    {
      id: 1,
      user_id: 5,
      perk_id: 3
    },
    {
      id: 2,
      user_id: 6,
      perk_id: 2
    },
    {
      id: 3,
      user_id: 5,
      perk_id: 1
    }
  ]);
};
