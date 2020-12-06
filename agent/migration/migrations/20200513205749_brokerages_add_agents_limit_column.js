exports.up = function (knex) {
  return knex.schema.table('brokerages', (t) => {
    t.integer('agents_limit').defaultTo(0)
    t.dropColumn('agent_limit')
  })
}

exports.down = function (knex) {
  return knex.schema.table('brokerages', (t) => {
    t.integer('agent_limit').defaultTo(0)
    t.dropColumn('agents_limit')
  })
}
