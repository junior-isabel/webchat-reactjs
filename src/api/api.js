import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:4000',
    headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        mode: 'cors'
    }
})
export default api