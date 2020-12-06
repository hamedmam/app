exports.up = function (knex) {
  return knex.schema.alterTable('brokerages', (t) => {
    t.uuid('id')
      .defaultTo(knex.raw('uuid_generate_v4()'))
      .unique()
      .primary()
      .alter()
  })
}

exports.down = function (knex) {}
