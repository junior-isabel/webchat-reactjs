import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { RESET_NOTIFICATION_MESSAGEM } from '../../../stores/reducers/notifications'
import { RESET_CHAT } from '../../../stores/reducers/chat'
import { RESET_MESSAGE_ALERT } from '../../../stores/reducers/messages'
export default () => {
  const dispatch = useDispatch()

  useEffect(() => {

    dispatch({
      type: RESET_CHAT
    })

    dispatch({
      type: RESET_MESSAGE_ALERT
    })
    dispatch({
      type: RESET_NOTIFICATION_MESSAGEM
    })

  })
  localStorage.clear()
  return (<Redirect to={{ pathname: "/register" }} />)

}