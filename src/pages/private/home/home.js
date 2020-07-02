import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  Person,
  Search,
} from '@material-ui/icons'
import { Avatar } from '@material-ui/core'
import './home.scss'
import MessageUser from '../../../components/messageUser/message-user'
import LayoutDefault from '../../../components/layouts/default'
import AppHeader from '../../../components/widgets/headers/app-header'
import ListMessage from '../../../components/listMessage/list-message'
import InputMessage from '../../../components/input-message/input-message'
import { getUserToken } from '../../../utils/token'
import { getFriends } from '../../../api/services/friend'
import listMessagesId from '../../../api/services/messages'

import { SET_FRIEND_CHAT } from '../../../stores/reducers/chat'
import TypeActions from '../../../stores/constants'


export default () => {
  document.title = "chat - mubenq"
  const profile = getUserToken()
  let chat = useSelector(state => state.chat.friends)
  let messages = useSelector(state => state.messages)
  let talk = useSelector(state => state.talk)
  let inbox = useSelector(state => state.messages[talk.userId]) || []
  
  const dispatch = useDispatch()

  const selectMessage = (user) => {
    dispatch({
      type: TypeActions.SET_MESSAGE_ACTIVE_USER,
      payload: {
        userId: user.id
      }
    })
    dispatch({
      type: TypeActions.RESET_COUNTER_MESSAGE,
      payload: {
        userId: user.id
      }
    })
  }
  useEffect(() => {
    if (chat.length) return
    
    getFriends().then(data => {
      dispatch({
        type: SET_FRIEND_CHAT,
        payload: data
      })
    })
  }, [chat.length, dispatch])

  useEffect(() => {
    if (talk.userId === undefined) return
    if (messages[talk.userId]) return
    listMessagesId(talk.userId).then((res) => {
      dispatch({
        type: TypeActions.SET_MESSAGE,
        payload: {
          userId: talk.userId,
          messages: res
        }
      })
    })
  }, [talk.userId, dispatch, messages])

  useEffect(() => {
    return () => dispatch({type: TypeActions.RESET_MESSAGE_ACTIVE_USER})
  }, [dispatch])

  return (
    <LayoutDefault>
      <div className="home-page">
        <div className="container">
          <div className="row">
            <aside className="column tabnav painel-message">
              <div className="userInfo">
                <Avatar>
                  <Person fontSize="large" />
                </Avatar>
                <label> {`${profile.firstName} ${profile.lastName}`}</label>
              </div>
              <form className="form-search" action="">
                <label>
                  <input type="text" placeholder="search" disabled />
                  <Search />
                </label>
              </form>
              <ul className="message-friends">
                {chat && chat.map((user) => (
                  <li key={user.id} className={user.id === talk.userId ? 'active' : ''}>
                    <MessageUser user={user} handlerOpenMessage={() => selectMessage(user)} />
                  </li>
                ))}
              </ul>
              <footer>
                <Link to="/findfriend">encontre amigos</Link>
              </footer>
            </aside>
            <section className="column content">
              {<AppHeader user={talk.userId !== undefined && chat.filter(friend => friend.id === talk.userId)[0]} />}
              {talk.userId !== undefined &&
                <ListMessage inbox={inbox} />}
              <footer>
                <InputMessage userId={talk.userId} />
              </footer>
            </section>
          </div>
        </div>
      </div>
    </LayoutDefault>
  )
} 