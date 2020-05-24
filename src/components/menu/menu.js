import React, {useState} from 'react'
import {
  Menu
} from '@material-ui/icons'
import {Link} from 'react-router-dom'
import './menu.scss'
export default () => {
    const [isShowMenu, setIsShowMenu] = useState(false)
    const handlerShowMenu = () => {
      setIsShowMenu(!isShowMenu)
    } 
    const links = {
      '/': 'Mensages',
      /* '/mycontacts': 'Contactos', */
      '/findfriend': 'Encontrar amigos',
      '/logout': 'Sair'
    }
    return (
        <nav className="app-navbar">
          <span className="icone-menu" onClick={handlerShowMenu}>
            <Menu fontSize="large" color="primary"></Menu>
          </span>
          <section className={`navbar-links ${isShowMenu ? 'active': ''}`}>
            <ul className="list-links">
              {
              Object.keys(links)
              .map(( key, index) =>
              (<li key={index}><Link to={key}>{links[key]}</Link></li>)
              )}
            </ul>
          </section>
        </nav>
    )
}