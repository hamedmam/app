exports.up = async function (knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
  await knex.raw('CREATE EXTENSION IF NOT EXISTS CITEXT')
  await knex.raw(
    `CREATE DOMAIN domain_phone_number AS CITEXT CHECK ( VALUE ~ '^[0][1-9]d{9}$|^[1-9]d{9}$' )`
  )
  return knex.schema.createTable('brokerages', (t) => {
    t.uuid('id').defaultTo(knex.raw('uuid_generate_v4()'))
    t.string('user_sub', 60).notNull()
    t.string('name', 50).notNull()
    t.specificType('email', 'CITEXT').unique().notNull()
    t.specificType('phone_number', 'domain_phone_number').unique().notNull()
    t.boolean('is_active').defaultTo(false)
    t.boolean('has_confirmed_email').defaultTo(false)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('brokerages')
}
