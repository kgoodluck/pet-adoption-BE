exports.up = function(knex) {
    return knex.schema.alterTable("pets_to_users_watchlish", (table) => {
        table.renameColumn("user_id", "id");
        table.dropColumn("pet_id");
    }); 
};

exports.down = function(knex) {
  
};
