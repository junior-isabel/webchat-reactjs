import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Person,
  AttachFile,
  InsertEmoticon,
  Send,
  Search,
 } from '@material-ui/icons'
import {Avatar} from '@material-ui/core'
import './home.scss'
import MessageUser from '../../../components/messageUser/message-user'
import LayoutDefault from '../../../components/layouts/default'
import AppHeader from '../../../components/widgets/headers/app-header'
import ListMessage from '../../../components/listMessage/list-message'
export default (props) => {
  document.title ="chat - webChat"
  const [myProfile] = useState(JSON.parse(localStorage.getItem('autheticate') || JSON.stringify({email: ''})))
  const [users, setUsers] = useState([
    {name: 'jose junior', time: '2h', 
    messages: [{name: 'jose junior', text: 'hello world', time: '15min'},
    {name: 'mim', text: 'hello angola', time: 'agora'},
    {name: 'mim', text: 'hello angola', time: 'agora'},
    {name: 'mim', text: 'hello angola', time: 'agora'},
    {name: 'mim', text: 'hello angola', time: 'agora'},
    {name: 'mim', text: 'hello angola', time: 'agora'},
    {name: 'mim', text: 'hello angola', time: 'agora'},
    {name: 'mim', text: 'hello angola', time: 'agora'},
    {name: 'mim', text: 'hello angola', time: 'agora'}
]},
    {name: 'lindalva jose', time: '30min', messages: [{name: 'mim', text: 'tudo bem comigo?', time: '2dias'}]},
    {name: 'euclides chicapue', time: '1h', messages: []},
    {name: 'euclides chicapue', time: '1h', messages: []},
    {name: 'euclides chicapue', time: '1h', messages: []},
    {name: 'euclides chicapue', time: '1h', messages: []},
    {name: 'euclides chicapue', time: '1h', messages: []},
    {name: 'euclides chicapue', time: '1h', messages: []},
    {name: 'euclides chicapue', time: '1h', messages: []},
    {name: 'euclides chicapue', time: '1h', messages: []},
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
    <LayoutDefault>
      <div className="home-page">
        <div className="container">
          <div className="row">
            <aside className="column tabnav painel-message">
              <div className="userInfo">
                <Avatar>
                  <Person fontSize="large"/>
                </Avatar>
                <label> {myProfile.email}</label>
              </div>
              <form className="form-search" action="">
                <label>
                  <input type="text" placeholder="search" disabled/>
                  <Search />
                </label>
              </form>
                <ul className="message-friends">
                  {users.map((user, index) => (
                    <li key={index} className={index === userActive ? 'active': ''}>
                      <MessageUser user={user} handlerOpenMessage={() => selectMessage(index)}/>
                    </li>
                  ))}
                </ul>
              <footer>
                <Link to="/findfriend">encontre amigos</Link>
              </footer>
            </aside>
            <section className="column content">
              <AppHeader user={ userActive !== -1 && users[userActive] }/>
              {userActive !== -1 && users[userActive].messages.length !== 0 && <ListMessage messages={users[userActive].messages}/>}
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
    </LayoutDefault>
  )
} 