import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';

const Nav = (props) => (
  <div className="nav">
    <Link to="/main">
      <h2 className="nav-title">Party Pooper Planner</h2>
    </Link>
    <div className="nav-right">
      <Link className="nav-link" to="/main">
        {/* Show this link if they are logged in or not,
        but call this link 'Main' if they are logged in,
        and call this link 'Login / Register' if they are not */}
        {props.user.id ? 'Main' : 'Login / Register'}
      </Link>
      {/* Show the link to the info page and the logout button if the user is logged in */}
      {props.user.id && (
        <>
          <Link className="nav-link" to="/group">
            Group
          </Link>
          <Link className="nav-link" to="/friend">
            Friend
          </Link>
          <LogOutButton className="nav-link"/>
        </>
      )}
    </div>
  </div>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
