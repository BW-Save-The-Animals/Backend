exports.seed = async knex => {
  await knex("donations").insert([
    {
      id: 1,
      user_id: 4,
      reward_id: 3
    },
    {
      id: 2,
      user_id: 1,
      reward_id: 1
    },
    {
      id: 3,
      user_id: 3,
      reward_id: 1
    }
  ]);
};
