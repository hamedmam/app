import { APIGatewayProxyHandler } from 'aws-lambda'
import { DynamoDB } from 'aws-sdk'

const dynamodb = new DynamoDB.DocumentClient()

const addClient: APIGatewayProxyHandler = async (event, _context) => {
  const { id } = event.pathParameters
  const now = new Date()

  const agentClient = {
    id: Math.random().toString(),
    clientId: id,
    createdAt: now.toISOString(),
  }
  try {
    await dynamodb
      .put({
        TableName: process.env.AGENT_CLIENT_TABLE_NAME,
        Item: agentClient,
      })
      .promise()
  } catch (error) {
    console.error(error)
  }

  return {
    statusCode: 201,
    body: JSON.stringify(agentClient),
  }
}

export const handler = addClient
