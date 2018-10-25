import React, { Component } from 'react';
import { connect } from 'react-redux';

class GroupPage extends Component {
    state = {
        friendName: '',
        friendEmail: '',
        groupId: '',
    }

    handleChangeFor = property => event => {
        this.setState({
            [property]: event.target.value,
        });
    }

    handleDeleteClick = friend => () => {
        if(window.confirm('Want to delete?')) {
            this.props.dispatch({ type: 'DELETE_FRIEND', payload: friend });
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        if(this.state.groupId === '' || this.state.groupId === null){
            alert('Group has to be selected');
        } else {
            this.props.dispatch({ type: 'ADD_FRIEND', payload: this.state });
            this.setState({ friendName: '', friendEmail: '', groupId: '' });
        }
    }

    componentDidMount = () => {
        this.props.dispatch({ type: 'GROUP_LIST' });
        this.props.dispatch({ type: 'FRIEND_LIST' });
    }

    render() {
        return (
            <div>
                <h2>Friends</h2>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="friendInput">Friend : </label>
                    <input type="text" id="friendInput" value={this.state.friendName} onChange={this.handleChangeFor('friendName')} required />
                    <label htmlFor="emailInput">E-Mail : </label>
                    <input type="email" id="emailInput" value={this.state.friendEmail} onChange={this.handleChangeFor('friendEmail')} required />
                    <label htmlFor="groupList">Group : </label>
                    <select id="groupList" name="groupList" onChange={this.handleChangeFor('groupId')} required>
                        <option value="">select</option>
                        {this.props.groupList.map(group =>
                            <option key={group.id} value={group.id}>{group.group_name}</option>
                        )}
                    </select>
                    <button type="submit">Add Group</button>
                </form>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>E-Mail</th>
                            <th>Group</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.friendList.map(friend => 
                            <tr key={friend.id}>
                                <td>{friend.friend_name}</td>
                                <td>{friend.friend_email}</td>
                                <td>{friend.group_name}</td>
                                <td><button>Update</button></td>
                                <td><button onClick={this.handleDeleteClick(friend)}>Delete</button></td>
                            </tr>    
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = state => ({ 
    groupList: state.groupList,
    friendList: state.friendList.friendList 
});

export default connect(mapStateToProps)(GroupPage);