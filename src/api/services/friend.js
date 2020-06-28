import api from '../api'
import getToken from '../../utils/token'

export async function getFriends() {
  let result
  try {
    const token = getToken()
    result = await api.get('/users/friends', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return result.data
  } catch (error) {
    return error
  }
}