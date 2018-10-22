import React, { Component } from 'react';
import { connect } from 'react-redux';

class NewInvitation extends Component {

    componentDidMount = () => {
        // this.props.dispatch({ type: '' });
    }

    render() {
        return (
            <div>
                <h2>Make an Invitation</h2>
                <form>
                    <label htmlFor="title">Title : </label>
                    <input id="title" name="title" type="text" /><br />
                    <label htmlFor="image">Image : </label>
                    <input id="image" name="image" type="text" /><br />
                    <label htmlFor="message">Message : </label>
                    <input id="message" name="message" type="text" /><br />
                    <label htmlFor="secretMsg">Secret Message : </label>
                    <input id="secretMsg" name="secretMsg" type="text" /><br />
                    <label htmlFor="date">Date : </label>
                    <input id="date" name="date" type="date" /><br />
                    <label htmlFor="location">Location : </label>
                    <input id="location" name="location" type="text" /><br />
                    <label htmlFor="friendList">Friends : </label>
                    <select id="friendList" name="friendList">
                        <option>select</option>
                        
                    </select>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    groupList: state.groupList,
    friendList: state.friendList,
});

export default connect(mapStateToProps)(NewInvitation);