exports.seed = async knex => {
  await knex("perks").insert([
    {
      id: 1,
      campaign_id: 2,
      title: "One wooden fish",
      description: "We will send you a wooden fish",
      amount: 30
    },
    {
      id: 2,
      campaign_id: 1,
      title: "Three wooden fishes",
      description: "We will send you three wooden fishes",
      amount: 90
    },
    {
      id: 3,
      campaign_id: 1,
      title: "Adopt a turtle",
      description: "Adopt a turtle and give it your name",
      amount: 100
    },
    {
      id: 4,
      campaign_id: 3,
      title: "Adopt an elephant",
      description: "Adopt an elephant and give it your name",
      amount: 1000
    }
  ]);
};
