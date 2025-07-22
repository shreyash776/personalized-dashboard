import axios from 'axios'

const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || ''
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET || ''

let cachedToken = ''
let tokenExpires = 0

async function getAccessToken() {
  // Return cached token if valid
  if (cachedToken && Date.now() < tokenExpires) return cachedToken

  const headers = {
    Authorization: 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
    'Content-Type': 'application/x-www-form-urlencoded',
  }
  const params = new URLSearchParams()
  params.append('grant_type', 'client_credentials')

  const response = await axios.post('https://accounts.spotify.com/api/token', params, { headers })
  const { access_token, expires_in } = response.data
  cachedToken = access_token
  tokenExpires = Date.now() + expires_in * 1000 - 60000 
  return access_token
}

export async function getNewReleases() {
  const token = await getAccessToken()
  const resp = await axios.get('https://api.spotify.com/v1/browse/new-releases?limit=12', {
    headers: { Authorization: `Bearer ${token}` }
  })
  return resp.data.albums.items 
}
