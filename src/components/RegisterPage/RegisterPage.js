import React, { Component } from 'react';
import { connect } from 'react-redux';
import './RegisterPage.css';

class RegisterPage extends Component {
  state = {
    username: '',
    userEmail: '',
    password: '',
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password && this.state.userEmail) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          userEmail: this.state.userEmail,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div>
        {this.props.errors.registrationMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <div className="registerFrame">
          <form onSubmit={this.registerUser} className="loginForm">
            <h1>Register User</h1>
            <div>
              <label htmlFor="username">
                Username
              </label>
              <input
                  type="text"
                  id="username"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleInputChangeFor('username')}
              />
            </div>
            <div>
              <label htmlFor="userEmail">
                Email
              </label>
              <input
                  type="text"
                  id="userEmail"
                  name="userEmail"
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
                  id="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChangeFor('password')}
              />
            </div>
            <div>
              <input
                className="register"
                type="submit"
                name="submit"
                value="Register"
              />
            </div>
          </form>
          <center className="loginButton">
            <button type="button" className="link-button" onClick={() => { this.props.dispatch({ type: 'SET_TO_LOGIN_MODE' }) }}>Login</button>
          </center>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(RegisterPage);

