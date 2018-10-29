import React, {Component} from 'react';
import { HashRouter as Router, Route, Redirect, Switch, } from 'react-router-dom';

import {connect} from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import MainPage from '../MainPage/MainPage';
import InvitationForm from '../InvitationForm/InvitationForm';
import GroupPage from '../GroupPage/GroupPage';
import FriendPage from '../FriendPage/FriendPage';
import EventDetail from '../EventDetail/EventDetail';
import GuestPage from '../GuestPage/GuestPage';

import './App.css';

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'});
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/main" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route
              exact
              path="/guest/:id"
              component={GuestPage}
            />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/main"
              component={MainPage}
            />
            <ProtectedRoute
              exact
              path="/new"
              component={InvitationForm}
            />
            <ProtectedRoute
              exact
              path="/group"
              component={GroupPage}
            />
            <ProtectedRoute
              exact
              path="/friend"
              component={FriendPage}
            />
            <ProtectedRoute
              path="/detail"
              component={EventDetail}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
  )}
}

export default connect()(App);
