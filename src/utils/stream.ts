'use server'
import { StreamChat } from 'stream-chat'

// instantiate your stream client using the API key and secret
// the secret is only used server side and gives you full access to the API
// find your API keys here https://getstream.io/dashboard/
const serverClient = StreamChat.getInstance(
  'gasc55sqc9yx',
  'vbrsc6sfhr3d7ushyzx5eanggtubctvjbjt6whtmhgxx2e2qs5ru6azec47q88h5'
)

const createUserToken = async (userId: string) => {
  return serverClient.createToken(userId)
}

// next, hand this token to the client in your in your login or registration response

// instantiate a new client (client side)
// const client = StreamChat.getInstance('gasc55sqc9yx')

export { createUserToken }
