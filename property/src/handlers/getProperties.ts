import { APIGatewayProxyHandler } from 'aws-lambda'

const getProperties: APIGatewayProxyHandler = async (event, _context) => {
  try {
    const musics = [
      { id: 1, artist: 'Sirvan', song: 'Zendegi' },
      { id: 2, artist: 'Alireza', song: 'Ay Dele Ghafel' },
    ]

    return {
      statusCode: 200,
      body: JSON.stringify(musics),
    }
  } catch (error) {
    console.error(error)
  }
}

export const handler = getProperties
