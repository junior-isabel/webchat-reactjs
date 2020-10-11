import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PhoneCallback } from '@material-ui/icons'
import TypeActions from '../../stores/constants'
import './receive-call-video.scss'
export default () => {
  const state = useSelector(state => state.call)
  const { user } = state.from
  const dispatch = useDispatch()
  function acceptCall () {
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