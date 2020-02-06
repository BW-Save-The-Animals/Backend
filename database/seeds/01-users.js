const bcrypt = require("bcryptjs");
//// user_type: 2 are companies, type 1 are supporters.

exports.seed = async knex => {
  await knex("users").insert([
    {
      email: "animallover@google.com",
      password: bcrypt.hashSync("super_secret", 14),
      name: "Tom",
      user_type: 1,
      about:
        "I have always loved animals and would like to contribute to saving them"
    },
    {
      email: "world@zoo.com",
      password: bcrypt.hashSync("pass", 14),
      name: "Jake",
      user_type: 2,
      about:
        "As an owner of a zoo,I would like to raise funds to take in some endangered animals"
    },
    {
      email: "animal@fans.com",
      password: bcrypt.hashSync("safety", 14),
      name: "Richard",
      user_type: 1,
      about: "I have a few pets,I would like to contribute to this cause"
    },
    {
      email: "rodrigograca31@gmail.com",
      password: bcrypt.hashSync("12345", 14),
      name: "Rodrigo",
      user_type: 1,
      about: "Cat-man"
    },
    {
      email: "mail@worldwildlife.org",
      password: bcrypt.hashSync("spy", 14),
      name: "Michael",
      user_type: 2,
      about:
        "WWF - World Wild Life is here to raise money to save various animals"
    },
    {
      email: "sea@world.com",
      password: bcrypt.hashSync("sea", 14),
      name: "Dana",
      user_type: 2,
      about:
        "I would like to have an ethical way of doing business,as owner of sea world"
    }
  ]);
};

