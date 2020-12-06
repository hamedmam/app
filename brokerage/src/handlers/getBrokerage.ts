import { APIGatewayProxyHandler } from 'aws-lambda'
import { DynamoDB } from 'aws-sdk'

const dynamodb = new DynamoDB.DocumentClient()

const getBrokerage: APIGatewayProxyHandler = async (event, _context) => {
  const { id } = event.pathParameters
  try {
    const result = await dynamodb
      .get({
        Key: { id },
        TableName: process.env.BROKERAGE_TABLE_NAME,
      })
      .promise()
    if (!result.Item) {
      return {
        statusCode: 404,
        body: `Brokerage with ID: ${id} Not Found`,
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

export const handler = getBrokerage
