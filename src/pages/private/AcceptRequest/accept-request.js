import React, { useState, useEffect } from 'react'
import {
  AccountCircle
} from '@material-ui/icons'

import LayoutDefault from '../../../components/layouts/default'
import { acceptFriend, getSolicities } from '../../../api/services/findFriend'
import './accept-request.scss'
export default (props) => {
  document.title = "Encontrar amigos"
  const [users, setUsers] = useState([])
  useEffect(() => {
    async function loadData() {
      try {
        let data = await getSolicities()
        setUsers(data.friends)
      } catch (error) {

      }
    }
    loadData()
  }, [])
  function handlerSolicitarAmizade(id) {
    acceptFriend(id).then(data => {
      let _users = users.filter(user => user.id !== id)
      setUsers(_users)
    })
    
  }
  return (
    <LayoutDefault>
      <div className="find-friend">
        <section className="result-search-people">
          <ul className="list-people">
            {
              users.length ? users.map(user => (
                <li key={user.id}>
                  <div className="list-people-avatar">
                    <AccountCircle />
                  </div>
                  <div className="list-people-user-info">
                    <h5>{`${user.firstName} ${user.lastName}`}</h5>
                    <button onClick={() => handlerSolicitarAmizade(user.id)}>aceita solicitação</button>
                  </div>
                </li>

              )) : <p>não existe pedido para aceitar...</p>
            }
          </ul>
        </section>
      </div>
    </LayoutDefault>
  )
}