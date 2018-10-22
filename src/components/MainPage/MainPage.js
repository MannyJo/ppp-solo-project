import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import EventList from '../EventList/EventList';

class MainPage extends Component {
    handleNewClick = () => {
        this.props.history.push('/new');
    }

    render() {
        return (
            <div>
                <h1 id="welcome">
                    Welcome, { this.props.user.user_name }!
                </h1>
                <div>
                    <div>- Your History</div>
                    <div><button onClick={this.handleNewClick}>New Invitation</button></div>
                    <EventList />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default withRouter(connect(mapStateToProps)(MainPage));