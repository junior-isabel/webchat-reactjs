import api from '../api'


export async function getCities() {
  let result
  try {
    result = api.get('/cities').then(data => data).catch(err => {
      throw new Error(err)
    })
    
    return (await result).data
  } catch (error) {
    return {
      error,
      data: []
    }
  }
}