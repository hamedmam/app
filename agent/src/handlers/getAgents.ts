import { APIGatewayProxyHandler } from 'aws-lambda'
import { DynamoDB } from 'aws-sdk'

const dynamodb = new DynamoDB.DocumentClient()

const getAgents: APIGatewayProxyHandler = async (event, _context) => {
  try {
    const agents = await dynamodb
      .scan({
        TableName: process.env.AGENT_TABLE_NAME,
      })
      .promise()
    return {
      statusCode: 200,
      body: JSON.stringify(agents),
    }
  } catch (error) {
    console.error(error)
  }
}

export const handler = getAgents
