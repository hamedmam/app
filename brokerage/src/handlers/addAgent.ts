import { APIGatewayProxyHandler } from 'aws-lambda'

const addAgent: APIGatewayProxyHandler = async (event, _context) => {
  const { id } = event.pathParameters

  return {
    statusCode: 201,
    body: JSON.stringify('hamed'),
  }
}

export const handler = addAgent
