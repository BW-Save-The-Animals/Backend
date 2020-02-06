exports.seed = async knex => {
  await knex("donations").insert([
    {
      user_id: 4,
      campaign_id: 3,
      donation_amount: 1234
    },
    {
      user_id: 1,
      campaign_id: 1,
      donation_amount: 950
    },
    {
      user_id: 3,
      campaign_id: 1,
      donation_amount: 5000
    }
  ]);
};
