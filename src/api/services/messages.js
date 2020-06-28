import api from '../api'
import getToken from '../../utils/token'

export default async function listMessagesId(id) {
  let result
  try {
    const token = getToken()
    result = await api.get('/messages/' + id, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return result.data
  } catch (error) {
    return error
  }
}

export async function sendMessageId(id, text, image, type) {
    let result
    try {
      const token = getToken()
      const formData = new FormData()
      formData.append('text', text)
      formData.append('type', type)
      formData.append('image', image)
     
      result = await api.post('/messages/send/' + id, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`

        }
      })
      return result.data
    } catch (error) {
      return error
    }
  }