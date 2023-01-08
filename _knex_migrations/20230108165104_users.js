exports.up = function(knex) {
    return knex.schema.createTable("users", (table) => {
        table.increments("id").primary();
        table.string("first_name").notNull();
        table.string("last_name").notNull();
        table.string("email").notNull();
        table.string("phone").notNull();
        table.boolean("is_admin").notNull().defaultTo(false);
        table.string("adopted_pets");
        table.string("fostered_pets");
        table.string("watch-list_pets");
        table.string("hashed_password").notNull();
        table.timestamp("registered_at").defaultTo(knex.fn.now());
      }); 
};

exports.down = function(knex) {
  
};
