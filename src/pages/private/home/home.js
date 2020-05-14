import React, { useState } from 'react'
import { NotificationsOff,
  MoreVert,
  Person,
  AttachFile,
  InsertEmoticon,
  Send,
  Search,
 } from '@material-ui/icons'
import {Avatar} from '@material-ui/core'
import './home.scss'
import MessageUser from '../../../components/messageUser/message-user'
import MessageContext from '../../../components/messageContext/message-context'
export default (props) => {
  const [users, setUsers] = useState([
    {name: 'jose junior', time: '2h', 
    messages: [{name: 'jose junior', text: 'hello world', time: '15min'}, {name: 'mim', text: 'hello angola', time: 'agora'}]},
    {name: 'lindalva jose', time: '30min', messages: [{name: 'mim', text: 'tudo bem comigo?', time: '2dias'}]},
    {name: 'euclides chicapue', time: '1h', messages: []}
  ])
  const [message, setMessage] = useState('')
  const selectMessage = (id) => {
    setUserActive(id)
  }
  const sendMessage = (e) => {
    if(userActive === -1 || message === '') return
    let copyMessages = Object.assign([], users[userActive]).messages
    copyMessages.push({
      name: 'min',
      text: message,
      time: 'agora'
    })
    let copyUsers = Object.assign([], users)
    copyUsers[userActive].messages = copyMessages
    setUsers(copyUsers)
    setMessage('')
  }
  const [userActive, setUserActive] = useState(-1)
  return (
    <div className="home-page">
      <div className="container">
        <div className="row">
          <aside className="column tabnav painel-message">
            <div className="userInfo">
              <Avatar>
                <Person fontSize="large"/>
              </Avatar>
              <label> user name</label>
            </div>
            <form className="form-search" action="">
              <label>
                <input type="text" placeholder="search" disabled/>
                <Search />
              </label>
            </form>
              <ul className="message-friends">
                {users.map((user, index) => (
                  <li key={index} className={index === userActive ? 'active': ''}><MessageUser user={user} handlerOpenMessage={() => selectMessage(index)}/></li>
                ))}
              </ul>
            <footer>
              encontre amigos
            </footer>
          </aside>
          <section className="column content">
            <header className="content-header nav-height">
                <span className="user-active">{ userActive !== -1 && users[userActive].name}</span>
              <div className="content-header-setting">
                <NotificationsOff />
                <MoreVert />
              </div>
            </header>
            {userActive !== -1 && users[userActive].messages.length !== 0 && <section className="content-body">
              <ul className="list-message">
                {users[userActive].messages && users[userActive].messages.map((message,index) =>
                <li key={index}>
                <MessageContext message={message} />
              </li>)}
              </ul>
            </section>}
            <footer>
              <div className="input-message">
                <AttachFile />
                <label className="input-text">
                  <input type="text" value={message} onChange={e => setMessage(e.target.value)} placeholder="text message..."/>
                  <InsertEmoticon />
                </label>
                <span onClick={sendMessage}>
                  <Send />
                </span>
              </div>
            </footer>
          </section>
        </div>
      </div>
    </div>
  )
} 