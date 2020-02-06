exports.seed = async knex => {
  await knex("perks").insert([
    {
      campaign_id: 2,
      title: "One wooden fish",
      description: "We will send you a wooden fish",
      amount: 30
    },
    {
      campaign_id: 1,
      title: "Three wooden fishes",
      description: "We will send you three wooden fishes",
      amount: 90
    },
    {
      campaign_id: 1,
      title: "Adopt a turtle",
      description: "Adopt a turtle and give it your name",
      amount: 100
    },
    {
      campaign_id: 3,
      title: "Adopt an elephant",
      description: "Adopt an elephant and give it your name",
      amount: 1000
    }
  ]);
};
