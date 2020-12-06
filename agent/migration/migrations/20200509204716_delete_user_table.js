exports.up = function (knex) {
  return knex.schema.dropTable('user')
}

exports.down = function (knex) {
  return knex.schema.createTable('user', (table) => {
    table.increments()
    table.string('first_name')
  })
}
