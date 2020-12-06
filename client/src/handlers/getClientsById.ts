import { APIGatewayProxyHandler } from 'aws-lambda'
import { DynamoDB } from 'aws-sdk'

const dynamodb = new DynamoDB.DocumentClient()
const TABLE_NAME = process.env.CLIENT_TABLE_NAME

const getClientsById: APIGatewayProxyHandler = async (event, _context) => {
  const { ids } = event.pathParameters

  try {
    const result = await dynamodb
      .batchGet({
        RequestItems: {
          [TABLE_NAME]: {
            Keys: ids.map((id) => {
              return { id }
            }),
          },
        },
      })
      .promise()
    // batchgetitems returns the object in the shape that table name is a key for response
    const clients = result.Responses[TABLE_NAME]
    console.log(clients)
    // if (!result.Items) {
    //   return {
    //     statusCode: 404,
    //     body: `Client with ID: ${id} Not Found`,
    //   }
    // }
    return {
      statusCode: 200,
      body: clients,
    }
  } catch (error) {
    console.error(error)
  }
}

export const handler = getClientsById
