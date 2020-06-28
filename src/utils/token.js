export default function getToken () {
    const key = (JSON.parse(localStorage.getItem('token')))
    return key ? key.token : ''
}

export function setToken(token) {

    localStorage.setItem('token', JSON.stringify(token))
}

export function setUserToken (user) {
    localStorage.setItem('token-user', JSON.stringify(user))
}

export function getUserToken () {
    return JSON.parse(localStorage.getItem('token-user'))
}