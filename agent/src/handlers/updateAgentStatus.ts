import { APIGatewayProxyHandler } from 'aws-lambda'
import { DynamoDB } from 'aws-sdk'

const dynamodb = new DynamoDB.DocumentClient()

const updateAgentStatus: APIGatewayProxyHandler = async (event, _context) => {
  const { id, activityStatus } = event.pathParameters
  try {
    await dynamodb
      .update({
        TableName: process.env.AGENT_TABLE_NAME,
        Key: { id },
        UpdateExpression: 'SET activityStatus = :activityStatus',
        ExpressionAttributeValues: {
          ':activityStatus': activityStatus,
        },
      })
      .promise()
    return {
      statusCode: 201,
      body: 'done',
    }
  } catch (error) {
    console.error(error)
  }
}

export const handler = updateAgentStatus
