import { APIGatewayProxyHandler } from 'aws-lambda'
import { DynamoDB } from 'aws-sdk'

const dynamodb = new DynamoDB.DocumentClient()

const getClients: APIGatewayProxyHandler = async (event, _context) => {
  try {
    const clients = await dynamodb
      .scan({
        TableName: process.env.CLIENT_TABLE_NAME,
      })
      .promise()
    return {
      statusCode: 200,
      body: JSON.stringify(clients),
    }
  } catch (error) {
    console.error(error)
  }
}

export const handler = getClients
