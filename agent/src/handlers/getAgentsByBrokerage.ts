import { APIGatewayProxyHandler } from 'aws-lambda'

import pool from '../db'
import { getItemsByForeignKey, TABLE_NAME } from '../query'

const getAgentsByBrokerage: APIGatewayProxyHandler = async (
  event,
  _context
) => {
  const { id } = event.pathParameters
  try {
    const response = await pool.query(
      getItemsByForeignKey(TABLE_NAME, 'brokerage_id', id)
    )
    return {
      statusCode: 200,
      body: JSON.stringify(response.rows),
    }
  } catch (error) {
    console.error(error)
  }
}

export const handler = getAgentsByBrokerage
