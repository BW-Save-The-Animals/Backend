require('dotenv').config();
module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
    },
    seeds: { directory: './database/seeds' }
    // client: 'pg',
    // connection: {
    //   filename: './database/save_the_animals.db3'
    // },
    // useNullAsDefault: true,
    // migrations: {
    //   directory: './database/migrations'
    // },
    // seeds: {
    //   directory: './database/seeds'
    // }
  },
  testing: {
    client: 'sqlite3',
    connection: {
      filename: './database/save_the_animals_test.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
    },
    seeds: { directory: './database/seeds' }
  }
};
