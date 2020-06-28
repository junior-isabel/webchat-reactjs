import api from '../api'
import { setToken } from '../../utils/token'
export async function login(username, password) {
  let result
  try {
    result = await api.post('/auths', { username, password })
    setToken(result.data)
    return result.data
  } catch (err) {
    localStorage.removeItem('token')
    return err.response
  }
}
export async function create(data) {
  let result
  try {
    result = await api.post('/accounts', data)
    return result
  } catch (err) {
    return err.response
  }
}