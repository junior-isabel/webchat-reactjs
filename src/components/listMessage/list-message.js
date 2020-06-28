import React, { useEffect } from 'react'
import './list-message.scss'
import CardMessage from '../cardMessage/card-message'
import { getUserToken } from '../../utils/token'
export default ({ inbox }) => {

  const messages = inbox.messages || []
  const profile = getUserToken()
  useEffect(() => {
    let timeId = setTimeout(() => {
      const element = document.querySelector('.card-list-message-scroll-down')
      const height = element.scrollHeight
      element.scrollTo(0, height + element.scrollTop)

    }, 200)
    return () => clearTimeout(timeId)
  }, [messages])
  return (
    <section className="card-list-message card-list-message-scroll-down">
      <ul className="list-message">
        {messages.map((message, index) =>
          <li key={index}>
            <CardMessage message={message} profile={profile} />
          </li>)}
      </ul>
    </section>)
}