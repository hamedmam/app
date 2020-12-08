import * as pg from 'pg'
const { Pool } = pg
import dbConfig from './secrets/db_configuration'
const { user, password, host, port, database } = dbConfig

const pool = new Pool({
  user,
  password,
  host,
  port,
  database,
})

export default pool
