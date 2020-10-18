import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Peer from 'simple-peer'
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
  let chatTalks = useSelector(state => state.chat.talks)
  let messages = useSelector(state => state.messages)
  let talk = useSelector(state => state.talk)
  let inbox = useSelector(state => state.messages[talk.id]) || []
  const peer = useRef()
  const dispatch = useDispatch()
  const selectMessage = (user) => {
    const talk = chatTalks.find(talk => talk.userFrom === user.id || talk.userTo === user.id)
    dispatch({
      type: TypeActions.SET_MESSAGE_ACTIVE_USER,
      payload: talk
      
    })
    dispatch({
      type: TypeActions.RESET_COUNTER_MESSAGE,
      payload: {
        id: talk.id
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
    if (talk.id === undefined || messages[talk.id]) return
    listMessagesId(talk.id).then((res) => {
      dispatch({
        type: TypeActions.SET_MESSAGE,
        payload: {
          talkId: talk.id,
          messages: res
        }
      })
    })
  }, [talk, dispatch])


  
  useEffect(() => {
    return () => dispatch({type: TypeActions.RESET_MESSAGE_ACTIVE_USER})
  }, [dispatch])

  const callUser = async (user) => {
    try {
      const stream = await navigator
      .mediaDevices
      .getUserMedia({ video: true})
      
        peer.current = new Peer({
          initiator: true,
          trickle: false,
          stream: stream
        })
        dispatch({
          type: TypeActions.SET_STREAM,
          payload: stream
        })
        dispatch({
          type: TypeActions.SET_PEER,
          payload: peer
        })
      } catch(err) {
        console.log('não foi possivel connectar-se com a sua webcam')
    }

    dispatch({
      type: TypeActions.STATUS_CALL,
      payload: {
        to: user,
        from: profile.id
      }
    })
  }
  function getFriendIdTalk (id, profile) {
    if (talk.userFrom === profile.id) return talk.userTo
    else if (talk.userTo === profile.id) return talk.userFrom
  }
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
                  <li key={user.id} className={user.id === getFriendIdTalk(talk, profile)? 'active' : ''}>
                    <MessageUser user={user} handlerOpenMessage={() => selectMessage(user)} />
                  </li>
                ))}
              </ul>
              <footer>
                <Link to="/findfriend">encontre amigos</Link>
              </footer>
            </aside>
            <section className="column content">
              {<AppHeader
              user={talk.id !== undefined && chat.filter(friend => friend.id === getFriendIdTalk(talk, profile))[0]}
              handlerCallUser={callUser}
              />}
              {talk.id !== undefined &&
                <ListMessage inbox={inbox} />}
              <footer>
                <InputMessage userId={getFriendIdTalk(talk, profile)} meId={profile.id} />
              </footer>
            </section>
          </div>
        </div>
      </div>
    </LayoutDefault>
  )
} 