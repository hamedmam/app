import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda'

import pool from '../db'
import { getItemById, TABLE_NAME } from './../query'

type Event = {
  pathParameters: {
    id: string
  }
}

const getAgent: APIGatewayProxyHandler = async (
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
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
    return err
  }
}

export const handler = getAgent
