import { APIGatewayProxyHandler } from 'aws-lambda'
import { DynamoDB } from 'aws-sdk'

const dynamodb = new DynamoDB.DocumentClient()

const createBrokerage: APIGatewayProxyHandler = async (event, _context) => {
  const now = new Date()

  const brokerage = {
    id: Math.random().toString(),
    createdAt: now.toISOString(),
    seatCount: 0,
  }
  try {
    await dynamodb
      .put({
        TableName: process.env.BROKERAGE_TABLE_NAME,
        Item: brokerage,
      })
      .promise()
  } catch (error) {
    console.error(error)
  }

  return {
    statusCode: 201,
    body: JSON.stringify(brokerage),
  }
}

export const handler = createBrokerage
