exports.up = function(knex) {
    return knex.schema.createTable("pets_to_users_watchlish", (table) => {
        table.string("user_id").primary();
        table.string("pet_id").notNull();
        table.timestamp("added_at").defaultTo(knex.fn.now());
      }); 
};

exports.down = function(knex) {
  
};
