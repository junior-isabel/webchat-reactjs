import React from 'react'
import { NotificationsOff, MoreVert, Person, AttachFile, InsertEmoticon, Send, Search } from '@material-ui/icons'
import {Avatar} from '@material-ui/core'
import './home.scss'
export default (props) => {

  return (
    <div className="home-page">
      <div className="container">
        <div className="row">
          <section className="column tabnav">
            <div className="userInfo">
              <Avatar>
                <Person fontSize="large"/>
              </Avatar>
              <label> user name</label>
            </div>
            <form className="form-search" action="">
              <label>
                <input type="text" placeholder="search"/>
                <Search />
              </label>
            </form>
          </section>
          <section className="column content">
            <header className="content-header nav-height">
              <span className="user-active">josé chicapué junior</span>
              <div className="content-header-setting">
                <NotificationsOff />
                <MoreVert />

              </div>
            </header>
            <section className="content-body">
              <ul className="list-message">
                <li>
                  <div className="avatar"><Person fontSize="large"/></div>
                  <div className="message">
                    <label><strong>author</strong></label>
                    <div className="text">my message...</div>
                  </div>
                  <div className="metadata">à 2min</div>
                </li>
                <li>
                  <div className="avatar"><Person fontSize="large"/></div>
                  <div className="message">
                    <label><strong>author</strong></label>
                    <div className="text">my message...<br />I need a car</div>
                  </div>
                  <div className="metadata">à 8min</div>
                </li>
              </ul>
            </section>
            <footer>
              <div className="input-message">
                <AttachFile />
                <label className="input-text">
                  <input type="text" placeholder="text message..."/>
                  <InsertEmoticon />
                </label>
                <Send />
              </div>
            </footer>
          </section>
        </div>
      </div>
    </div>
  )
} 