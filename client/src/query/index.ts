type TableName = 'agents' | 'brokerages' | 'clients' | 'properties'

export const TABLE_NAME = 'clients'

export const getItemById = (tableName: TableName, id) =>
  `SELECT * FROM ${tableName} WHERE id = '${id}'`

export const createItem = (tableName: TableName, columns, values) =>
  `INSERT INTO ${tableName} ${columns} VALUES ${values}`

export const getItems = (tableName: TableName) => `SELECT * FROM ${tableName}`
