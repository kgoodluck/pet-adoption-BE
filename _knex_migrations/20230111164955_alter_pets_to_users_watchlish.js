exports.up = function(knex) {
    return knex.schema.alterTable("pets_to_users_watchlish", (table) => {
        table.string("user_id").notNull();
        table.string("pet_id").notNull();
    }); 
};


exports.down = function(knex) {
  
};
