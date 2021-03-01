import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Profile from '../containers/Profile/Profile'
import Home from '../containers/Home/Home'
import { Logout } from '../Logout/Logout'
import SignIn from '../containers/SignIn/SignIn'

const ProtectedRoute = ({ render: C, props: childProps, ...rest }) => {
  console.log("childProps.isLoggedIn ", childProps.isLoggedIn)
  console.log("childProps.isLoggedIn == true", childProps.isLoggedIn === true)
  console.log(C)
  return (
    <Route
      {...rest}
      render={rProps =>
        childProps.isLoggedIn ? (
          <C {...rProps} {...childProps} />
        ) : (
          // <Redirect
          //   to={`/auth?redirect=${rProps.location.pathname}${rProps.location.search}`}
          // />
          <Redirect
            to={`/auth`}
          />
        )
      }
    /> 
  )
}

const ProppedRoute = ({ render: C, props: childProps, ...rest }) => (
  <>
    <div style={{ textAlign: 'center' }}>          
      <Route {...rest} render={rProps => <C {...rProps} {...childProps} />} />
      {/* <footer>Footer Area</footer> */}
    </div>
  </>
)

export const Routes = ({ childProps }) => (  
  <Switch>
    <ProtectedRoute exact path="/" render={Home} props={childProps} />
    <ProtectedRoute exact path="/profile" render={Profile} props={childProps} />
       
       
    <ProppedRoute exact path="/auth" render={SignIn} props={childProps} />
    <ProppedRoute exact path="/logout" render={Logout} props={childProps} />
  </Switch>
)