import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import HomePage from '../../pages/private/home/home'
import FindFriendPage from '../../pages/private/FindFriend/findFriend'
import ValidateAccountPage from '../../pages/private/validateAccount/validate-account'
import LogoutPage from '../../pages/private/logout/logout'
const PrivateRoute = ({ children, ...rest }) => {
  const autheticate = localStorage.getItem('autheticate') || null
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return autheticate ? children :
          (
            <Redirect
              to={{
                pathname: '/register',
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
      <Route path="/logout" component={LogoutPage} />
    </Switch>
  )
}