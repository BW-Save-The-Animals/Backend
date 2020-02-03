exports.seed = async knex => {
  await knex("species").insert([
    {
      id: 1,
      specie_name: "Cat"
    },
    {
      id: 2,
      specie_name: "Dog"
    },
    {
      id: 3,
      specie_name: "Panda"
    },
    {
      id: 4,
      specie_name: "Bear"
    },
    {
      id: 5,
      specie_name: "Sheep"
    },
    {
      id: 6,
      specie_name: "Turtle"
    },
    {
      id: 7,
      specie_name: "Elephant"
    },
    {
      id: 8,
      specie_name: "Fish"
    }
  ]);
};
