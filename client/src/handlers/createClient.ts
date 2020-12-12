import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda'
import validator from '@middy/validator'
import jsonBodyParser from '@middy/http-json-body-parser'
import middy from '@middy/core'
import pool from '../db'
import { createItem, TABLE_NAME } from '../query'

type Event = {
  body: {
    id: string
    name: string
  }
}

const createClient: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent & Event,
  _context
) => {
  const { id, name } = event.body
  console.log(id, name)
  try {
    const res = await pool.query(
      createItem(TABLE_NAME, '(id, name)', `('${id}', '${name}')`)
    )
    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'success' }),
    }
  } catch (err) {
    console.log(err)
  }
}

const inputSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        id: { type: 'string', minLength: 36, maxLength: 36 },
        name: { type: 'string' },
      },
      required: ['id', 'name'], // Insert here all required event properties
    },
  },
}

export const handler = middy(createClient)
  .use(jsonBodyParser())
  .use(validator({ inputSchema }))
