exports.up = async function (knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
  return knex.schema.createTable('clients', (t) => {
    t.uuid('id').defaultTo(knex.raw('uuid_generate_v4()'))
    t.string('name', 50).notNull()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('clients')
}
