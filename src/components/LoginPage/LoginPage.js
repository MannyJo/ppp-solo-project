import React, { Component } from 'react';
import { connect } from 'react-redux';
import './LoginPage.css';

class LoginPage extends Component {
  state = {
    userEmail: '',
    password: '',
  };

  login = event => {
    event.preventDefault();

    if (this.state.password && this.state.userEmail) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          userEmail: this.state.userEmail,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => event => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div>
        {this.props.errors.loginMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.loginMessage}
          </h2>
        )}
        <div className="loginFrame">
          <form onSubmit={this.login} className="loginForm">
            <h1 className="loginLogo">Log In</h1>
            <div>
              <label htmlFor="userEmail">
                Email
            </label>
              <input
                type="email"
                id="userEmail"
                name="userEmail"
                placeholder="Enter Email"
                autoFocus
                value={this.state.userEmail}
                onChange={this.handleInputChangeFor('userEmail')}
              />
            </div>
            <div>
              <label htmlFor="password">
                Password
            </label>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            </div>
            <div>
              <input
                className="log-in"
                type="submit"
                name="submit"
                value="Log In"
              />
            </div>
          </form>
          <center className="registerButton">
            <button type="button" className="link-button" onClick={() => { this.props.dispatch({ type: 'SET_TO_REGISTER_MODE' }) }}>Register</button>
          </center>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(LoginPage);
