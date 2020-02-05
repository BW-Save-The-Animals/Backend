module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./database/save_the_animals.db3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    }
  },
  testing: {
    client: 'sqlite3',
    connection: {
      filename: './database/save_the_animals_test.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
  },
};
