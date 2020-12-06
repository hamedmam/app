import { APIGatewayProxyHandler } from 'aws-lambda'
import { DynamoDB } from 'aws-sdk'

const dynamodb = new DynamoDB.DocumentClient()

const updateBrokerageSeat: APIGatewayProxyHandler = async (event, _context) => {
  const { id, seatCount } = event.pathParameters

  try {
    await dynamodb
      .update({
        TableName: process.env.BROKERAGE_TABLE_NAME,
        Key: { id },
        UpdateExpression: 'SET seatCount = :seatCount',
        ExpressionAttributeValues: {
          ':seatCount': seatCount,
        },
      })
      .promise()
  } catch (error) {
    console.error(error)
  }

  return {
    statusCode: 201,
    body: 'done',
  }
}

export const handler = updateBrokerageSeat
