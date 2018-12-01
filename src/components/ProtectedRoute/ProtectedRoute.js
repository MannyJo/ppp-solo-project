import React from 'react';
import {Route} from 'react-router-dom'
import {connect} from 'react-redux';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';

const ProtectedRoute = (props) => {
  // takes ComponentToProtect from component prop
  // grabs all other props and passes them along to route
  const {
    component: ComponentToProtect,
    user,
    loginMode,
    ...otherProps
  } = props;

  // Return a Route component that gets added to our list of routes
  return (
      <Route
        // all props like 'exact' and 'path' that were passed in
        // are now passed along to the 'Route' Component
        {...otherProps}
        render={() => (
          // if the user is logged in (only logged in users have ids)
          user.id ?
          // show the component that is protected
          <ComponentToProtect /> :
          // if they are not logged in, check the loginMode on Redux State
          // if the mode is 'login'
          loginMode === 'login' ?
          // show the LoginPage
          <LoginPage /> :
          // the the user is not logged in and the mode is not 'login'
          // show the RegisterPage
          <RegisterPage />
        )}
      />
  )
}

const mapStateToProps = ({user, loginMode}) => ({user, loginMode});

export default connect(mapStateToProps)(ProtectedRoute);