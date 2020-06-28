import api from '../api'
import getToken from '../../utils/token'

export default async function getProfile() {
  let result
  try {
    const token = getToken()
    result = await api.get('/profile-user', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return result.data
  } catch (error) {
    return error
  }
}