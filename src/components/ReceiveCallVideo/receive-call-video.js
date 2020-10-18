import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Peer from 'simple-peer'
import { PhoneCallback } from '@material-ui/icons'
import TypeActions from '../../stores/constants'
import './receive-call-video.scss'
export default () => {
  const state = useSelector(state => state.call)
  const { profile: user } = state.from
  const dispatch = useDispatch()
  const peer = useRef()
 
  async function acceptCall () {
    try {
      const stream = await navigator
      .mediaDevices
      .getUserMedia({ video: true})
      peer.current = new Peer({
        initiator: false,
        trickle: false,
        stream: stream
      })
      dispatch({
        type: TypeActions.SET_STREAM,
        payload: stream
      })
      dispatch({
        type: TypeActions.SET_PEER,
        payload: peer
      })

    } catch(err) {

    }

    dispatch({
      type: TypeActions.STATUS_CALL,
      payload: {
        status: 'call accept'
      }
    })
  }
  return (
    <div className="receive-call-video">
      <div className="wrapper">
        <h3>Call Receive...</h3>
        <h5>{`${user.firstName} ${user.lastName}`}</h5>
        <button className="btn-link" onClick={() => acceptCall(user)}>
          <PhoneCallback fontSize="large" />
        </button>
      </div>
    </div>
  )
}