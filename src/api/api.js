import axios from 'axios'

const api = axios.create({
    baseURL: process.env.REACT_APP_URL, // https://mubenq-chat.herokuapp.com/
    headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        mode: 'cors'
    }
})
export default api