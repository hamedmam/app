exports.up = async function (knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
  return knex.schema.createTable('plans', (t) => {
    t.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).unique().primary()
    t.string('name', 50).notNull()
    t.integer('clients_limit').defaultTo(1)
    t.integer('price').defaultTo(0)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('plans')
}
