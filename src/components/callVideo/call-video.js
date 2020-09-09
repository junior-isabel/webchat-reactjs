import React from 'react'
import { useSelector } from 'react-redux'
import { CallEndRounded } 
from '@material-ui/icons'
import './call-video.scss'
export default ({ handlerCloseCall, localVideoRef, remoteVideoRef}) => {
  const contact = useSelector(state => {
    return state.call
  })
  return (
    <div className="call-video">
      <video ref={remoteVideoRef} autoPlay width="512" height="320"></video>
        <p className="call-text"> {contact.status} {contact.user && <strong>{contact.user.firstName} {contact.user.lastName}</strong>}</p>
      <video ref={localVideoRef} autoPlay width="512" height="320"></video>
      <div className="call-control">
        <button className="btn-link btn-rounded" onClick={handlerCloseCall}>
          <CallEndRounded fontSize="large" />
        </button>
      </div>
    </div>
  )
}