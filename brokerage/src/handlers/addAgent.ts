import { APIGatewayProxyHandler } from 'aws-lambda'
import { DynamoDB } from 'aws-sdk'

const dynamodb = new DynamoDB.DocumentClient()

const addAgent: APIGatewayProxyHandler = async (event, _context) => {
  const { id } = event.pathParameters
  const now = new Date()

  const brokerageAgent = {
    id: Math.random().toString(),
    brokerageId: id,
    createdAt: now.toISOString(),
  }
  try {
    await dynamodb
      .put({
        TableName: process.env.AGENT_TABLE_NAME,
        Item: brokerageAgent,
      })
      .promise()
  } catch (error) {
    console.error(error)
  }

  return {
    statusCode: 201,
    body: JSON.stringify(brokerageAgent),
  }
}

export const handler = addAgent
