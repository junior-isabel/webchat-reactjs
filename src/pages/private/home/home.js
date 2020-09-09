import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Peer from 'simple-peer'
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
import CallVideo from '../../../components/callVideo/call-video'
import ReceiveCallVideo from '../../../components/ReceiveCallVideo/receive-call-video'
import { getUserToken } from '../../../utils/token'
import { getFriends } from '../../../api/services/friend'
import listMessagesId from '../../../api/services/messages'

import { SET_FRIEND_CHAT } from '../../../stores/reducers/chat'
import TypeActions from '../../../stores/constants'


export default () => {
  document.title = "chat - mubenq"
  const profile = getUserToken()
  let chat = useSelector(state => state.chat.friends)
  const [userCallMe, setUserCallMe] = useState(null)
  const [isCallMe, setIsCallMe] = useState(false)
  let messages = useSelector(state => state.messages)
  let talk = useSelector(state => state.talk)
  const socket = useSelector(state => state.socket)
  let inbox = useSelector(state => state.messages[talk.userId]) || []
  const [callVideo, setCallVideo] = useState(false)
  const localVideoRef = useRef(null)
  const remoteVideoRef = useRef(null)
  
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
  let isCaller = false
  let [peer, setPeer] = useState(null)
  useEffect(() => {
    if (!socket) return

    socket.on('call-video-from', data => {
      console.log('invite')
      setUserCallMe(data)
      setIsCallMe(true)
    })
    if (!peer) return
    socket.on('call-video-in-action-close', () => {
      console.log('close connection')
      peer.destroy()
      socket.off('call-video-accept')
      socket.off('call-video-in-action')
      setIsCallMe(false)
      setCallVideo(false)
    })
   
  }, [socket, peer])
  
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

  const acceptCall = async () => {
    try {
      setCallVideo(true)
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false})
      setIsCallMe(false)
      localVideoRef.current.srcObject = stream

      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream: stream
      })
      setPeer(peer)
      peer.on('signal', signal => {
        if (!isCaller) {
          socket.emit('call-video-accept', {
            answer: signal,
            socket: userCallMe.socket
          })
        }
      })

      peer.on('connect', () => {
        isCaller = true
      })

      peer.on('stream', stream => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = stream
        }
      })
      peer.signal(userCallMe.offer)
    } catch (err) {

      console.log(err)
    }
  }
  const callUser = async () => {
    try {
      setCallVideo(true)
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false})
      const user = chat.find(user => user.id === talk.userId)
      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream: stream
      })
      setPeer(peer)
      peer.on('signal', signal => {
        localVideoRef.current.srcObject = stream
        if(!isCaller) {
          socket.emit('call-video-to', {
            offer: signal,
            userTo: talk.userId,
            userFrom: profile.id
          })
          dispatch({
            type: TypeActions.STATUS_CALL,
            payload: {
              status: `Contactando...`,
              user
            }
          })
        }
      })
      socket.on('call-video-in-action', () => {
        dispatch({
          type: TypeActions.STATUS_CALL,
          payload: {
            status: `Chamando...`,
            user
          }
        })
      })
      peer.on('stream', stream => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = stream
        }
      })
      peer.on('connect', () => {
        isCaller = true
      })
      
      socket.on('call-video-accept', data => {
        peer.signal(data.answer)
      })

    } catch (err) {}
  }
  const closeCall = () => {
    if(!peer) return
    peer.destroy()
    const userTo = (userCallMe && userCallMe.userFrom) || talk.userId
    setIsCallMe(false)
    setCallVideo(false)
    dispatch({
      type: TypeActions.STATUS_CALL,
      payload: {
        status: ``,
        user: undefined
      }
    })

    socket.emit('call-video-in-action-close', {userTo})
  }
  return (
    <LayoutDefault>
      <div className="home-page">
        {callVideo && <CallVideo
        handlerCloseCall={closeCall}
        localVideoRef={localVideoRef}
        remoteVideoRef={remoteVideoRef}
        profile={profile}
        />}
        {isCallMe && <ReceiveCallVideo user={userCallMe.user} acceptCall={acceptCall}/>
        }
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
              {<AppHeader
              user={talk.userId !== undefined && chat.filter(friend => friend.id === talk.userId)[0]}
              handlerCallUser={callUser}
              />}
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