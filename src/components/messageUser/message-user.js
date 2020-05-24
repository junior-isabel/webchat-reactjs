import React from 'react'
import { Person, Delete } from '@material-ui/icons'
import { Avatar } from '@material-ui/core'
import './message-user.scss'
export default ({ user, handlerOpenMessage }) => {

  return (
    <section className="message-user" onClick={handlerOpenMessage}>
      <figure className="avatar">
        <Avatar>
          <Person fontSize="large" />
        </Avatar>
      </figure>
      <div className="message-user-content">
        <header>
          <label className="name">{user.name}</label>
          <label>{user.time}</label>
        </header>
        <div className="text">
          <p>my message of day...</p>
        </div>
      </div>
      {/*<footer><Delete /></footer> */ }
    </section>
  )
}