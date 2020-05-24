import React from 'react'
import {
  AccountCircle
} from '@material-ui/icons'

import LayoutDefault from '../../../components/layouts/default'
import './find-friend.scss'
export default (props) => {
  document.title = "Encontrar amigos"
  return (
    <LayoutDefault>
      <div className="find-friend">
        <header className="header-search-people">
          <form action="">
            <div className="form-input-search">
              <label htmlFor="search-people">
              <AccountCircle />
                <input name="search" id="search-people"/>
              </label>
              <button type="submit">pesquisar</button>

            </div>
          </form>
        </header>
        <section class="result-search-people">
          <ul className="list-people">
            <li>
              <div className="list-people-avatar">
                <AccountCircle />
              </div>
              <div className="list-people-user-info">
                <h5>name user</h5>
                <button>solicitar amizade</button>
                <button>ver detalhes</button>
              </div>
            </li>
            <li>
              <div className="list-people-avatar">
                <AccountCircle />
              </div>
              <div className="list-people-user-info">
                <h5>name user</h5>
                <button>solicitar amizade</button>
                <button>ver detalhes</button>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </LayoutDefault>
  )
}