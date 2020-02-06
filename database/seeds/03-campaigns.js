exports.seed = async knex => {
  await knex("campaigns").insert([
    {
      id: 1,
      title: "Save the Turtles",
      photo: "https://i.imgur.com/sLc8FWD.png",
      location: "Galapagos",
      description:
        "We would like to purify the beach to give a better environment for turtles",
      urgency_level: 2,
      funding_goal: 120000,
      specie_id: 6,
      user_id: 2,
      deadline: "04/11/20"
    },
    {
      id: 2,
      title: "Remove all the plastic bottles",
      photo: "https://i.imgur.com/18ALpDG.jpg",
      location: "Australia",
      description:
        "The beach is full of plastic bottles poisoning the fishes, we would like to make a change here and clean the whole beach ",
      urgency_level: 1,
      funding_goal: 15000,
      specie_id: 8,
      user_id: 3,
      deadline: "09/01/21"
    },
    {
      id: 3,
      title: "Protect the Elephants",
      photo: "https://i.imgur.com/2A5Bv2m.jpg",
      location: "Kenya",
      description:
        "Here,our priority is creating a system to track elephants and protect them from poachers 24/7",
      urgency_level: 3,
      funding_goal: 1500000,
      specie_id: 7,
      user_id: 4,
      deadline: "05/08/22"
    }
  ]);
};
