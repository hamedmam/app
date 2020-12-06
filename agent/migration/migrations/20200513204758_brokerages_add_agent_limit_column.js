exports.up = function (knex) {
  return knex.schema.table('brokerages', (t) => {
    t.integer('agent_limit').defaultTo(0)
  })
}

exports.down = function (knex) {
  return knex.schema.table('brokerages', (t) => {
    t.dropColumn('agent_limit')
  })
}
