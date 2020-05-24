import React from 'react'
import { NotificationsOff,
  MoreVert,
 } from '@material-ui/icons'
 import './app-header.scss'
export default ({user}) => {
    return (
      <header className={`app-header content-header nav-height ${user ? '': 'hide'}`}>
        <span className="user-active">{user.name && user.name}</span>
        <div className="content-header-setting">
          <NotificationsOff />
          <MoreVert />
        </div>
      </header>
)
}