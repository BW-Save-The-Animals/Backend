exports.seed = async knex => {
  await knex("species").insert([
    {
      specie_name: "Cat"
    },
    {
      specie_name: "Dog"
    },
    {
      specie_name: "Panda"
    },
    {
      specie_name: "Bear"
    },
    {
      specie_name: "Sheep"
    },
    {
      specie_name: "Turtle"
    },
    {
      specie_name: "Elephant"
    },
    {
      specie_name: "Fish"
    }
  ]);
};
