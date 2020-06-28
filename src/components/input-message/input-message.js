import React, { useState } from 'react'
import {
  AttachFile,
  Send,
  CloseRounded
} from '@material-ui/icons'
import { useDispatch } from 'react-redux'
import './input-message.scss'
import { sendMessageId } from '../../api/services/messages'
import { ADD_MESSAGE } from '../../stores/reducers/messages'
export default ({ userId }) => {

  const [message, setMessage] = useState('')
  const [image, setImage] = useState('')
  const [previewimage, setPreviewImage] = useState('')
  const dispatch = useDispatch()
  function send() {
    if (!message && !image) return
    if (message.length > 5000) return
    sendMessageId(userId, message, image, !!image ? 'hipertext' : '').then(res => {
      setMessage('')
      dispatch({
        type: ADD_MESSAGE,
        payload: {
          userId,
          message: res
        }
      })
      setPreviewImage('')
      setImage('')
      setTimeout(() => {
        const element = document.querySelector('.card-list-message-scroll-down')
        const height = element.scrollHeight
        element.scrollTo(0, height + element.scrollTop)
      }, 100)
    })
  }
  function addImage (e) {
    e.preventDefault()

    setImage(e.target.files[0])
    setPreviewImage(URL.createObjectURL(e.target.files[0]))
  }
  function deletePreviewImage () {
    setImage('')
    setPreviewImage('')
  }
  return (
    <div className="input-message">
      <label htmlFor="file-image" className="file-message" title="adicionar imagem">
      <AttachFile />
      <input type="file" id="file-image" accept="image/*" onChange={addImage} />
      </label>
      <label className="input-text">
        <input type="text" onKeyDown={(e) => { e.keyCode === 13 && send() }} value={message} onChange={e => setMessage(e.target.value)} placeholder="text message..." />
       {/* <InsertEmoticon /> */}
      </label>
      <span onClick={send} title="enviar">
        <Send />
      </span>
      {previewimage && (
        <div className="previewImage">
          <CloseRounded onClick={deletePreviewImage} className="close-button"/>
        <img src={previewimage} alt="preview-file" width="100%" height="100%"/>
      </div>
      )}
      
    </div>
  )
}