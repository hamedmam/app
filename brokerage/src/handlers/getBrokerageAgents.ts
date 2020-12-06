import { APIGatewayProxyHandler } from 'aws-lambda'
import { DynamoDB, Lambda } from 'aws-sdk'

const lambda = new Lambda({
  region: process.env.REGION,
})

const ENV = process.env.ENVIRONMENT

const dynamodb = new DynamoDB.DocumentClient()

const getBrokerageAgents: APIGatewayProxyHandler = async (event, _context) => {
  const EXTERNAL_SERVICE = {
    name: 'agent-service',
    funcName: 'getAgentsById',
    db: 'Agent',
  }

  const { id } = event.pathParameters
  try {
    const response = await dynamodb
      .query({
        TableName: process.env.BROKERAGE_AGENT_TABLE_NAME,
        KeyConditionExpression: 'id = :brokerageid',
        ExpressionAttributeValues: {
          ':brokerageid': id,
        },
      })
      .promise()
    // external lambda
    const params = {
      FunctionName: `${EXTERNAL_SERVICE.name}-${ENV}-${EXTERNAL_SERVICE.funcName}`,
      InvocationType: 'RequestResponse',
      Payload: JSON.stringify({
        pathParameters: {
          ids: response.Items.map((agent) => agent.agentId),
        },
      }),
    }

    const res = await lambda.invoke(params).promise()
    const parsedResponse = JSON.parse(res.Payload)
    const agents = parsedResponse.body

    return {
      statusCode: 200,
      body: JSON.stringify(agents),
    }
  } catch (error) {
    console.error(error)
  }
}

export const handler = getBrokerageAgents
