exports.up = function(knex) {
    return knex.schema.alterTable("pets_to_users_watchlish", (table) => {
        table.dropColumn("id");
    }); 
};

exports.down = function(knex) {
  
};
