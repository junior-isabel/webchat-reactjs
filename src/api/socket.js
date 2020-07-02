import socketio from 'socket.io-client'

export let socket

export default function startSocketIO () {
    socket = socketio('https://mubenq-chat.herokuapp.com')
    return socket
}
export function startChat () {
    socket = socketio('https://mubenq-chat.herokuapp.com/chat')
}
export function getSocket () {

    return socket
}

