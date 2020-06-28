import React from 'react'
import { Person } from '@material-ui/icons'
import { Avatar } from '@material-ui/core'
import { useSelector } from 'react-redux'
import './message-user.scss'
export default ({ user, handlerOpenMessage }) => {
  const alerts = useSelector(state => state.alerts)

  return (
    <section className="message-user" onClick={handlerOpenMessage}>
      <figure className="avatar">
        <Avatar>
          <Person fontSize="large" />
        </Avatar>
      </figure>
      <div className="message-user-content">
        <header>
          <label className="name">{user.firstName} {alerts[user.id] && alerts[user.id].counter > 0 ? `(${alerts[user.id].counter})` : ''}</label>
          <label>{user.time}</label>
        </header>
        <div className="text">
        </div>
      </div>
    </section>
  )
}