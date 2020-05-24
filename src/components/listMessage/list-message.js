import React from 'react'
import './list-message.scss'
import CardMessage from '../cardMessage/card-message'
export default ({messages}) => {
  return (<section className="card-list-message">
    <ul className="list-message">
      {messages.map((message, index) =>
        <li key={index}>
          <CardMessage message={message} />
        </li>)}
    </ul>
  </section>)
}