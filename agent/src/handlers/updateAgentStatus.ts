import { APIGatewayProxyHandler } from 'aws-lambda'

const updateAgentStatus: APIGatewayProxyHandler = async (event, _context) => {
  const { id, activityStatus } = event.pathParameters
  try {
    return {
      statusCode: 201,
      body: 'done',
    }
  } catch (error) {
    console.error(error)
  }
}

export const handler = updateAgentStatus
