import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda'
import middy from '@middy/core'
import jsonBodyParser from '@middy/http-json-body-parser'
import validator from '@middy/validator'
import pool from '../db'
import { createItem, TABLE_NAME } from './../query'

type Event = {
  body: {
    id: string
    user_sub: string
    name: string
    email: string
  }
}

const createAgent: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent & Event,
  _context
) => {
  const { id, user_sub, name, email } = event.body
  try {
    const res = await pool.query(
      createItem(
        TABLE_NAME,
        '(id, user_sub, name, email)',
        `('${id}', '${user_sub}', '${name}', '${email}')`
      )
    )

    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'success' }),
    }
  } catch (error) {
    console.error(error)
  }
}

const inputSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        id: { type: 'string', minLength: 36, maxLength: 36 },
        user_sub: { type: 'string', minLength: 36, maxLength: 36 },
        name: { type: 'string' },
        email: { type: 'string' },
      },
      required: ['id', 'user_sub', 'name', 'email'], // Insert here all required event properties
    },
  },
}

export const handler = middy(createAgent)
  .use(jsonBodyParser())
  .use(validator({ inputSchema }))
