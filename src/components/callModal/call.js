import React, { useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './call.scss'
import TypeActions from '../../stores/constants'

export default function CallModal () {
  const localVideo = useRef()
  const remoteVideo = useRef()
  const statusCall = useSelector(state => state.call)
  const user = getUser()
  const stream = useSelector(state => state.stream)
  const peer =  useSelector(state => state.peer)
  const socket = useSelector(state => state.socket)
  const dispatch = useDispatch()
  function getUser () {
    if (statusCall.status === 'call user') {
      return {
        firstName: statusCall.to.firstName,
        lastName: statusCall.to.lastName
      }
    } else if (statusCall.status === 'call accept') {
      return {
        firstName: statusCall.from.profile.firstName,
        lastName: statusCall.from.profile.lastName
      }
    }
    return {
      firstName: '',
      lastName: ''
    }
  }
  useEffect(() => {
    if (localVideo.current) {
     localVideo.current.srcObject = stream
    }
    peer.current.on('stream', stream => {
      remoteVideo.current.srcObject = stream
    })
    peer.current.on('close', () => {
      dispatch({
        type: TypeActions.STATUS_REST
      })
      stream.getTracks().forEach(track => stream.removeTrack(track))
    })
  }, [localVideo, stream, peer])
  useEffect(() => {
    if (statusCall.status === 'call user') {
      callUser()
    } else if (statusCall.status === 'call accept') {
      acceptCall()
    }
  }, [])

  useEffect (() => {
    socket.on('call-video-in-action-close', id => {
      console.log('app %o', id)
      dispatch({
        type: TypeActions.STATUS_REST
      })
    })
  }, [])

  function callUser () {
    peer.current.on('signal', signal => {
      setTimeout(() => {
        socket.emit('call-video-to', {
          offer: signal,
          to: statusCall.to.id,
          from: statusCall.from
        })

      }, 1000)
    })
    
    socket.on('connection of contact', socket => {
      dispatch({
        type: TypeActions.STATUS_CALL,
        payload: {socketTo: socket},
      })
    })
    socket.on('call-video-in-action', id => {
    })
    socket.on('call-video-accept', data => {
        peer.current.signal(data.answer)
    })
  }
  function acceptCall () {
    
    peer.current.on('signal', signal => {
      setTimeout(() => {
        socket.emit('call-video-accept', {
          answer: signal,
          socket: statusCall.from.socket
        })
      })
    })
    peer.current.signal(statusCall.from.offer)
  }

  function terminateCall () {
    let user
    switch (statusCall.status) {
      case 'call user':
        user = statusCall.socketTo
        break;
        case 'call accept':
        user = statusCall.from.socket
        break
      default:
        break;
    }
    if (peer.current) {
      peer.current.destroy()
      socket.emit('call-video-in-action-close',{ socket: user })
    }
  }

  return (
    <div className="call-modal">
      <div className="wrapper">
        <p>
          {statusCall.status} {user.firstName} {user.lastName}
        </p>
        <video className="call-modal-video remote-video" width="500" height="500" ref={remoteVideo} autoPlay></video>
        <video className="call-modal-video local-video" autoPlay ref={localVideo} width="150" height="150"></video>
        <div className="controls">
          <button className="terminate-call" onClick={terminateCall} >terminar a chamada</button>
        </div>
      </div>
    </div>
  )
}