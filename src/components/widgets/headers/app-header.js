import React from 'react'
import { VideoCall , NotificationsOff, MoreVert } from '@material-ui/icons'
import './app-header.scss'
export default ({user, handlerCallUser}) => {
    return (
      <header className={`app-header content-header nav-height ${user ? '': 'hide'}`}>
        <span className="user-active">{user.firstName} {user.lastName}</span>
        <div className="content-header-setting">
          <button className="btn-link" onClick={() => handlerCallUser(user)}>
            <VideoCall />
          </button>
          <button className="btn-link">
            <NotificationsOff />
          </button>
          <button className="btn-link">
            <MoreVert />
          </button>
      </div>
      </header>
)
}