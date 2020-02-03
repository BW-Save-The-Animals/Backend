exports.up = function(knex) {
  return (
    knex.schema

      //////////////////////////////////// USERS

      .createTable("users", tbl => {
        tbl.increments();

        tbl
          .string("email", 254)
          .notNullable()
          .unique();

        tbl.string("password", 254).notNullable();
        tbl.string("name", 30).notNullable();
        tbl.integer("user_type", 1).notNullable();
        tbl.string("about", 200).notNullable();
      })

      //////////////////////////////////// CAMPAIGNS

      .createTable("campaigns", tbl => {
        tbl.increments();
        tbl
          .string("title", 200)
          .notNullable()
          .unique();
        tbl.string("photo", 200).unique();
        tbl.string("location", 30).notNullable();
        tbl.string("description", 200).notNullable();
        tbl.integer("urgency_level").notNullable();
        tbl.integer("funding_goal", 12).notNullable();
        tbl.string("deadline", 10).notNullable();

        tbl
          .integer("specie_id", 12)
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("species")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");

        tbl
          .integer("user_id", 12)
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("users")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
      })

      //////////////////////////////////// SPECIES

      .createTable("species", tbl => {
        tbl.increments();

        tbl
          .string("specie_name", 20)
          .notNullable()
          .unique();
      })

      /////////////////////////////////// PERKS

      .createTable("perks", tbl => {
        tbl.increments();

        tbl.string("title", 20).notNullable();
        tbl.string("description", 200).notNullable();
        tbl.integer("amount", 12).notNullable();
        tbl
          .integer("campaign_id", 12)
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("campaigns")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
      })

      /////////////////////////////////// DONATIONS

      .createTable("donations", tbl => {
        tbl.increments();

        tbl
          .integer("user_id", 12)
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("users")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        tbl
          .integer("campaign_id", 12)
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("campaigns")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");

        tbl.integer("donation_amount", 12).notNullable();
      })
      /////////////////////////////////// users_campaigns

      .createTable("users_perks", tbl => {
        tbl.increments();

        tbl
          .integer("user_id", 12)
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("users")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        tbl
          .integer("perk_id", 12)
          .unsigned()
          .notNullable()
          .unique()
          .references("id")
          .inTable("perks")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
      })
  );
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists("users_perks")
    .dropTableIfExists("donations")
    .dropTableIfExists("perks")
    .dropTableIfExists("species")
    .dropTableIfExists("campaigns")
    .dropTableIfExists("users");
};
