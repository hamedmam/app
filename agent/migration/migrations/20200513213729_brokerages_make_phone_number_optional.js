exports.up = function (knex) {
  return knex.schema.table('brokerages', (t) => {
    t.dropUnique('phone_number')
    t.specificType('phone_number', 'domain_phone_number').nullable().alter()
  })
}

exports.down = function (knex) {
  return knex.schema.table('brokerages', (t) => {
    t.unique('phone_number')
    t.specificType('phone_number', 'domain_phone_number').notNullable().alter()
  })
}
