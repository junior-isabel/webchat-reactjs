import socketIo from 'socket.io-client'

export let socket

export default function startSocketIO () {
   if (!socket) {
      socket = socketIo(process.env.REACT_APP_URL) // https://mubenq-chat.herokuapp.com
   }
    // console.log(socket)
  return socket
}/*
export function startChat () {
    socket = socketio(process.env.PUBLIC_URL)
}
*/
export function getSocket () {
  return socket
}

