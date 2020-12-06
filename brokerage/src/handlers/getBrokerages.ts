import { APIGatewayProxyHandler } from 'aws-lambda'
import { DynamoDB } from 'aws-sdk'

const dynamodb = new DynamoDB.DocumentClient()

const getBrokerages: APIGatewayProxyHandler = async (event, _context) => {
  try {
    const brokerages = await dynamodb
      .scan({
        TableName: process.env.BROKERAGE_TABLE_NAME,
      })
      .promise()
    return {
      statusCode: 200,
      body: JSON.stringify(brokerages),
    }
  } catch (error) {
    console.error(error)
  }
}

export const handler = getBrokerages
