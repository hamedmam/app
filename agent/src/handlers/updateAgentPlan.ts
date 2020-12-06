import { APIGatewayProxyHandler } from 'aws-lambda'
import { DynamoDB } from 'aws-sdk'

const dynamodb = new DynamoDB.DocumentClient()

const updateAgentPlan: APIGatewayProxyHandler = async (event, _context) => {
  const { id, planType } = event.pathParameters
  try {
    await dynamodb
      .update({
        TableName: process.env.AGENT_TABLE_NAME,
        Key: { id },
        UpdateExpression: 'SET planType = :planType',
        ExpressionAttributeValues: {
          ':planType': planType,
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

export const handler = updateAgentPlan
