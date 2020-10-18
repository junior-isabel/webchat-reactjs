import React from 'react'
import { Person } from '@material-ui/icons'
import { Avatar } from '@material-ui/core'
import { getUserToken } from '../../utils/token'
import { useSelector } from 'react-redux'
import './message-user.scss'


export default ({ user, handlerOpenMessage }) => {
  const profile = getUserToken()
  const alerts = useSelector(state => state.alerts)
  let talks = useSelector(state => state.chat.talks)
  const talk = talks.find(talk => talk[getTalk(talk, profile)] === user.id)
  function getTalk (talk, profile) {
    if (talk.userFrom === profile.id) return 'userTo'
    else if (talk.userTo === profile.id) return 'userFrom'
  }
  return (
    <section className="message-user" onClick={handlerOpenMessage}>
      <figure className="avatar">
        <Avatar>
          <Person fontSize="large" />
        </Avatar>
      </figure>
      <div className="message-user-content">
        <header>
          <label className="name">{user.firstName} {alerts[talk.id] && alerts[talk.id].counter > 0 ? `(${alerts[talk.id].counter})` : ''}</label>
          <label>{user.time}</label>
        </header>
        <div className="text">
        </div>
      </div>
    </section>
  )
}