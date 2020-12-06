import { APIGatewayProxyHandler } from 'aws-lambda'
import { DynamoDB } from 'aws-sdk'

const dynamodb = new DynamoDB.DocumentClient()

const getAgentByBrokerage: APIGatewayProxyHandler = async (event, _context) => {
  const { id } = event.pathParameters
  try {
    const result = await dynamodb
      .query({
        IndexName: 'brokerageAgent',
        KeyConditionExpression: 'brokerageId = :brokerageId',
        ExpressionAttributeValues: { ':brokerageId': id },
        TableName: process.env.AGENT_TABLE_NAME,
      })
      .promise()
    if (!result.Items.length) {
      return {
        statusCode: 404,
        body: `Agent with ID: ${id} Not Found`,
      }
    }
    return {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    }
  } catch (error) {
    console.error(error)
  }
}

export const handler = getAgentByBrokerage
