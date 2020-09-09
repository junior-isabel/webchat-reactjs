import React from 'react'
import { Avatar } from '@material-ui/core'
import './card-message.scss'

export default ({ message, profile }) => {

  function loadingImage(e) {
    // e.target.classList.add('lazyload')
    const lazys = Array.from(document.querySelectorAll('.message-context .message-context-text .lazyload'))
    if (lazys.length) {
      lazys[lazys.length - 1].src = lazys[lazys.length - 1].dataset.image

    }
    document.querySelector('.card-list-message-scroll-down').onscroll = (evt) => {
      const lazy = document.querySelectorAll('.message-context .message-context-text .lazyload')
      const { top, height } = evt.target.getBoundingClientRect()
      Array.from(lazy).forEach(item => {

        const { top: imageTop, height: imageHeight } = item.getBoundingClientRect()

        if (top < imageTop &&
          top + height > imageTop + imageHeight &&
          item.classList.contains('lazyload')) {

          item.src = item.dataset.image
          setTimeout(() => {
            item.classList.remove('lazyload')
          }, 800)
        }
      })

    }
  }

  return (
    <section className={['message-context', message.User.id === profile.id ? 'my-message' : ''].join(' ')}>
      <div className="avatar" data-username={`${message.User.firstName} ${message.User.lastName}`}>
        <Avatar fontSize="large" className={['avatar-title', message.User.id === profile.id ? 'user' : ''].join(' ')}>
          {message.User.firstName[0]}{message.User.lastName[0]}
        </Avatar>
      </div>
      <div className="message-context-text">
        {message.type === 'hipertext' &&
          <a href={message.urlImage} target="_blank" rel="noopener noreferrer">
            <img src='#'
              data-image={message.urlImage} width="100%" height="100%"
              className="lazyload"
              style={{ maxWidth: '400px', maxHeight: '500px' }}
              alt={message.urlImage}
              onError={loadingImage}
            />
          </a>}
        <div className="message-context-text.msg">
          <p className="text">
            {message.text}

          </p>
        </div>
        <p className="details"><b>{message.updatedAt.split('T')[0]}</b><b>{message.updatedAt.split('T')[1].split('.')[0]}</b></p>
      </div>
      <div className="metadata">{message.time}</div>
    </section>
  )
}