import { APIGatewayProxyHandler } from 'aws-lambda'
import { DynamoDB } from 'aws-sdk'

const dynamodb = new DynamoDB.DocumentClient()

const createAgent: APIGatewayProxyHandler = async (event, _context) => {
  const now = new Date()

  const agent = {
    id: Math.random().toString(),
    brokerageId: '123456',
    activityStatus: 'inactive',
    createdAt: now.toISOString(),
    planType: 'free',
    firstName: 'Hamed',
    lastName: 'Mamdoohi',
    avatar: 'https://nofiredrills.com/wp-content/uploads/2016/10/myavatar.png',
    email: 'hamed.mamdoohi@gmail.com',
  }
  try {
    await dynamodb
      .put({
        TableName: process.env.AGENT_TABLE_NAME,
        Item: agent,
      })
      .promise()
  } catch (error) {
    console.error(error)
  }

  return {
    statusCode: 201,
    body: JSON.stringify(agent),
  }
}

export const handler = createAgent
