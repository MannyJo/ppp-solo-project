import React, { Component } from 'react';
import { connect } from 'react-redux';

class NewInvitation extends Component {
    state = {
        friendListByGroup: [],
    }

    handleGroupChange = event => {
        this.setState({ friendListByGroup: [] });
        this.props.friendList.forEach(friend => {
            if(friend.group_id == event.target.value){
                this.setState({
                    friendListByGroup: [
                        ...this.state.friendListByGroup,
                        friend
                    ]
                });
            }
        });
    }

    componentDidMount = () => {
        this.props.dispatch({ type: 'GROUP_LIST' });
        this.props.dispatch({ type: 'FRIEND_LIST' });
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
                    <select id="groupList" name="groupList" onChange={this.handleGroupChange}>
                        <option value="">All Groups</option>
                        {this.props.groupList.map(group => 
                            <option key={group.id} value={group.id}>{group.group_name}</option>
                        )}
                    </select>
                    <select id="friendList" name="friendList">
                        {/* <option>all</option> */}
                        {this.state.friendListByGroup.map(friend => 
                            <option key={friend.id} value={friend.id}>{friend.friend_name}</option>
                        )}
                    </select>
                    <button>Add Friend</button>
                </form>
                {JSON.stringify(this.state.friendListByGroup)}
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