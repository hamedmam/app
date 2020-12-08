import { APIGatewayProxyHandler } from 'aws-lambda'

import pool from '../db'

const getItemById = (tableName, id) =>
  `SELECT * FROM ${tableName} WHERE id = '${id}'`

const getAgent: APIGatewayProxyHandler = async (event, _context) => {
  const { id } = event.pathParameters

  try {
    const response = await pool.query(getItemById('clients', id))

    console.log(response)
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    }
  } catch (err) {
    console.log(err)
  }
}

export const handler = getAgent
