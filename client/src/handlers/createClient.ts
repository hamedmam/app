import { APIGatewayProxyHandler } from 'aws-lambda'
import { DynamoDB } from 'aws-sdk'

const dynamodb = new DynamoDB.DocumentClient()

const createClient: APIGatewayProxyHandler = async (event, _context) => {
  const now = new Date()

  const client = {
    id: Math.random().toString(),
    createdAt: now.toISOString(),
  }
  try {
    await dynamodb
      .put({
        TableName: process.env.CLIENT_TABLE_NAME,
        Item: client,
      })
      .promise()
  } catch (error) {
    console.error(error)
  }

  return {
    statusCode: 201,
    body: JSON.stringify(client),
  }
}

export const handler = createClient
