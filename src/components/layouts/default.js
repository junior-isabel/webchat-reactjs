import React from 'react'

import './default.scss'
import AppMenu from '../menu/menu'
export default ({ children }) => {
  return (<div className="layout">
    <AppMenu />
    <div className="layout-container">
      {children}
    </div>
  </div>)
}