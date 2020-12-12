import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda'
import pool from '../db'
import { getItemById, TABLE_NAME } from '../query'

type Event = {
  pathParameters: {
    id: string
  }
}

const getProperty: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent & Event,
  _context
) => {
  const { id } = event.pathParameters
  try {
    const response = await pool.query(getItemById(TABLE_NAME, id))
    return {
      statusCode: 200,
      body: JSON.stringify(response.rows[0]),
    }
  } catch (error) {
    console.log(error)
  }
}

export const handler = getProperty
