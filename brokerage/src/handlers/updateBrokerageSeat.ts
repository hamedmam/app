import { APIGatewayProxyHandler } from 'aws-lambda'

const updateBrokerageSeat: APIGatewayProxyHandler = async (event, _context) => {
  const { id, seatCount } = event.pathParameters

  try {
    return {
      statusCode: 201,
      body: 'done',
    }
  } catch (error) {
    console.error(error)
  }
}

export const handler = updateBrokerageSeat
