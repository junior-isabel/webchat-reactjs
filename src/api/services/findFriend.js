import api from '../api'
import getToken from '../../utils/token'

export async function getFindFriend() {
  let result
  try {
    const token = getToken()
    result = await api.post('/peoples', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return result.data
  } catch (error) {
    return error.response.data
  }
}
export async function getPeople() {
  let result
  try {
    const token = getToken()
    result = await api.get('/peoples', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return result.data
  } catch (error) {
    return error.response.data
  }
}
export async function addFriend(id) {
  let result
  try {
    const token = getToken()
    result = await api.post(`/find-friend/${id}`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return result.data
  } catch (error) {
    return error
  }
}

export async function getSolicities() {
  let result
  try {
    const token = getToken()
    result = await api.get(`/find-friend/solicities`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return result.data
  } catch (error) {
    return error
  }
}
export async function acceptFriend(id) {
  let result
  try {
    const token = getToken()
    result = await api.put(`/find-friend/${id}`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return result.data
  } catch (error) {
    return error
  }
}