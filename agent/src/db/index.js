const { Pool } = require('pg')
const {
  user,
  password,
  host,
  port,
  database,
} = require('./secrets/db_configuration')

const pool = new Pool({
  user,
  password,
  host,
  port,
  database,
})

module.exports = pool
