import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class GuestLogin extends Component {
    state = {
        email: '',
    }

    handleLoginClick = event => {
        event.preventDefault();
        console.log(this.state);
    }

    handleChange = event => {
        this.setState({
            email: event.target.value,
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleLoginClick}>
                    <label htmlFor="guestLogin">Email : </label>
                    <input type="email" id="guestLogin" onChange={this.handleChange} placeholder="example@example.com" />
                    <input type="submit" value="Login" />
                </form>
            </div>
        );
    }
}

export default withRouter(GuestLogin);