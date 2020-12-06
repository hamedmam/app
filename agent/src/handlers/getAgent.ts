import { APIGatewayProxyHandler } from 'aws-lambda'
import { DynamoDB } from 'aws-sdk'

const dynamodb = new DynamoDB.DocumentClient()

const getAgent: APIGatewayProxyHandler = async (event, _context) => {
  const { id } = event.pathParameters
  try {
    const result = await dynamodb
      .get({
        Key: { id },
        TableName: process.env.AGENT_TABLE_NAME,
      })
      .promise()
    if (!result.Item) {
      return {
        statusCode: 404,
        body: `Agent with ID: ${id} Not Found`,
      }
    }
    return {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    }
  } catch (error) {
    console.error(error)
  }
}

export const handler = getAgent
