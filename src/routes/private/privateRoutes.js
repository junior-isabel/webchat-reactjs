import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import HomePage from '../../pages/private/home/home'
import FindFriendPage from '../../pages/private/FindFriend/findFriend'
import ValidateAccountPage from '../../pages/private/validateAccount/validate-account'
import LogoutPage from '../../pages/private/logout/logout'
import AcceptRequest from '../../pages/private/AcceptRequest/accept-request'


const PrivateRoute = ({ children, ...rest }) => {
  const autheticate = localStorage.getItem('token') || null
  const token = autheticate ? JSON.parse(autheticate) : null
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return token ? children :
          (
            <Redirect
              to={{
                pathname: '/logout',
                state: { from: location }
              }} />
          )
      }}
    />
  )
}
export default () => {
  return (
    <Switch>
      <PrivateRoute path="/" exact><HomePage /></PrivateRoute>
      <PrivateRoute path="/findfriend"><FindFriendPage /></PrivateRoute>
      <PrivateRoute path="/validateaccount"><ValidateAccountPage /></PrivateRoute>
      <PrivateRoute path="/accept-request"><AcceptRequest /></PrivateRoute>
      <Route path="/logout" component={LogoutPage} />
    </Switch>
  )
}