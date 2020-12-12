import { APIGatewayProxyHandler } from 'aws-lambda'

import pool from '../db'
import { getItems, TABLE_NAME } from '../query'

const getProperties: APIGatewayProxyHandler = async (event, _context) => {
  try {
    const response = await pool.query(getItems(TABLE_NAME))
    return {
      statusCode: 200,
      body: JSON.stringify(response.rows),
    }
  } catch (error) {
    console.error(error)
  }
}

export const handler = getProperties
