import socketio from 'socket.io-client'

export let socket

export default function startSocketIO () {
    socket = socketio(process.env.REACT_APP_URL) // https://mubenq-chat.herokuapp.com
    return socket
}
export function startChat () {
    socket = socketio(process.env.PUBLIC_URL)
}
export function getSocket () {

    return socket
}

