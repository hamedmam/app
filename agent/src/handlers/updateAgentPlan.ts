import { APIGatewayProxyHandler } from 'aws-lambda';

const updateAgentPlan: APIGatewayProxyHandler = async (event, _context) => {
  const { id, planType } = event.pathParameters;
  try {
    return {
      statusCode: 201,
      body: 'done',
    };
  } catch (error) {
    console.error(error);
  }
};

export const handler = updateAgentPlan;
