import React from 'react'
import { Person } from '@material-ui/icons'
import './card-message.scss'
export default ({message}) => {


  return (
    <section className="message-context">
      <div className="avatar"><Person fontSize="large" /></div>
        <div className="message-context-text">
          <label><strong>{message.name}</strong></label>
          <div className="message-context-text.msg">{message.text}</div>
        </div>
      <div className="metadata">{message.time}</div>
    </section>
  )
}