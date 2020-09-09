import React from 'react'

import { PhoneCallback } from '@material-ui/icons'
import './receive-call-video.scss'
export default ({ user, acceptCall }) => {

  return (
    <div className="receive-call-video">
      <div className="wrapper">
        <h3>Atender...</h3>
        <h5>{`${user.firstName} ${user.lastName}`}</h5>
        <button className="btn-link" onClick={() => acceptCall(user)}>
          <PhoneCallback fontSize="large" />
        </button>
      </div>
    </div>
  )
}