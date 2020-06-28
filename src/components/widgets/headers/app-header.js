import React from 'react'

import './app-header.scss'
export default ({user}) => {
    return (
      <header className={`app-header content-header nav-height ${user ? '': 'hide'}`}>
        <span className="user-active">{user.firstName} {user.lastName}</span>
        {/*<div className="content-header-setting">
          <NotificationsOff />
          <MoreVert />
      </div> */ }
      </header>
)
}