import React, {useRef, useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import Peer from 'simple-peer'
import './call.scss'

export default function CallModal () {
  const localVideo = useRef()
  const remoteVideo = useRef()
  const statusCall = useSelector(state => state.call)
  const user = getUser()
  const socket = useSelector(state => state.socket)
  const [stream, setStream] = useState(null)
  function getUser () {
    if (statusCall.status === 'call user') {
      return {
        firstName: statusCall.to.firstName,
        lastName: statusCall.to.lastName
      }
    } else if (statusCall.status === 'call accept') {
      return {
        firstName: statusCall.from.user.firstName,
        lastName: statusCall.from.user.lastName
      }
    }
    return {
      firstName: '',
      lastName: ''
    }
  }
  useEffect(() => {
    if (localVideo.current) {
      navigator
      .mediaDevices
      .getUserMedia({ video: true})
      .then(stream => {
        setStream(stream)
        localVideo.current.srcObject = stream
      })
      .catch(err => {
        console.log(err)
      })
    }
  }, [localVideo])
  function callUser () {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream
    })
    peer.on('signal', signal => {
      socket.emit('call-video-to', {
        offer: signal,
        to: statusCall.to.id,
        from: statusCall.from
      })
    })
    peer.on('stream', data =>  {
      remoteVideo.current.srcObject = data
    })

    socket.on('call-video-accept', data => {
      peer.signal(data.answer)
    })
  }

  function acceptCall () {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream
    })

    peer.on('signal', signal => {
      socket.emit('call-video-accept', {
        answer: signal,
        socket: statusCall.from.socket
      })
    })
    peer.on('stream', stream => {
      remoteVideo.current.srcObject = stream
    })
    peer.signal(statusCall.from.offer)
  }

  useEffect(() => {
    if (!stream || !socket ) return
    if (statusCall.status === 'call user') {
      callUser()
    } else if (statusCall.status === 'call accept') {
      acceptCall()
    }
  }, [stream, socket])
  return (
    <div className="call-modal">
      <div className="wrapper">
        <p>
          {statusCall.status} {user.firstName} {user.lastName}
        </p>
        <video className="call-modal-video remote-video" width="500" height="500" ref={remoteVideo} autoPlay></video>
        <video className="call-modal-video local-video" autoPlay ref={localVideo} width="150" height="150"></video>
      </div>
    </div>
  )
}