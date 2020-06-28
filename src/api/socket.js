import socketio from 'socket.io-client'

export let socket

export default function startSocketIO () {
    socket = socketio('http://localhost:4000')
    return socket
}
export function startChat () {
    socket = socketio('http://localhost:4000/chat')
}
export function getSocket () {

    return socket
}

