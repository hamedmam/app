import { APIGatewayProxyHandler } from 'aws-lambda'
import { DynamoDB, Lambda } from 'aws-sdk'

const lambda = new Lambda({
  region: process.env.REGION,
})

const ENV = process.env.ENVIRONMENT

const dynamodb = new DynamoDB.DocumentClient()

const getAgentClients: APIGatewayProxyHandler = async (event, _context) => {
  const EXTERNAL_SERVICE = {
    name: 'client-service',
    funcName: 'getClientsById',
    db: 'Client',
  }

  const { id } = event.pathParameters
  try {
    const response = await dynamodb
      .query({
        TableName: process.env.AGENT_CLIENT_TABLE_NAME,
        KeyConditionExpression: 'id = :agentid',
        ExpressionAttributeValues: {
          ':agentid': id,
        },
      })
      .promise()
    // external lambda
    const params = {
      FunctionName: `${EXTERNAL_SERVICE.name}-${ENV}-${EXTERNAL_SERVICE.funcName}`,
      InvocationType: 'RequestResponse',
      Payload: JSON.stringify({
        pathParameters: {
          ids: response.Items.map((client) => client.clientId),
        },
      }),
    }

    const res = await lambda.invoke(params).promise()
    const parsedResponse = JSON.parse(res.Payload)
    const clients = parsedResponse.body

    return {
      statusCode: 200,
      body: JSON.stringify(clients),
    }
  } catch (error) {
    console.error(error)
  }
}

export const handler = getAgentClients
