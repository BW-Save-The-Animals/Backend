exports.up = function(knex) {
  return knex.schema
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

    .createTable("species", tbl => {
      tbl.increments();

      tbl
        .string("specie_name", 20)
        .notNullable()
        .unique();
    })

    .createTable("species", tbl => {
      tbl.increments();

      tbl
        .string("specie_name", 20)
        .notNullable()
        .unique();
    })
      
      
      

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

      tbl
        .integer("specie_id", 12)
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("species")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
