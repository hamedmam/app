import { APIGatewayProxyHandler } from 'aws-lambda'
import pool from '../db'
import { getItemById, TABLE_NAME } from '../query'

const getBrokerageAgents: APIGatewayProxyHandler = async (event, _context) => {
  const { id } = event.pathParameters
  try {
    const response = await pool.query(getItemById(TABLE_NAME, id))
    return {
      statusCode: 200,
      body: JSON.stringify(id),
    }
  } catch (error) {
    console.error(error)
  }
}

export const handler = getBrokerageAgents
