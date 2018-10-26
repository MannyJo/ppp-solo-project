import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class NewInvitation extends Component {
    state = {
        title: 'This is my first title',
        message: 'This is my first message',
        secretMessage: 'This is my first secret message',
        endDate: '2018-10-28',
        location: '1305 Madison street, St. Paul, MN',
        selectedFriends: [],
    }

    handleAddClick = event => {
        event.preventDefault();

        let friendId = document.getElementById('friendList').value;

        const selectedFriend = this.props.friendListByGroupId.map(friend => {
            return { ...friend, checked: false };
        }).filter(friend => {
            let count = 0; // counter to check the same id is in the table
            this.state.selectedFriends.forEach(addedFriend => {
                if (friend.id === addedFriend.id) {
                    count++;
                }
            });

            // if there is already the same friend in the table, return nothing
            if (count > 0) {
                return false;
            }

            // 0: all
            if (friendId === '0') {
                return true;
            } else if (Number(friendId) === friend.id) {
                return true;
            }
            return false;
        });

        this.setState({ selectedFriends: [...this.state.selectedFriends, ...selectedFriend] });
    }

    handleDeleteClick = id => event => {
        event.preventDefault();
        const selectedFriends = this.state.selectedFriends.filter(friend => (friend.id !== id));

        this.setState({ selectedFriends: [...selectedFriends] });
    }

    // whenever group changes, the friend list changes properly as well
    handleGroupChange = event => {
        this.props.dispatch({
            type: 'GET_FRIEND_LIST_BY_GROUP_ID',
            payload: { friendList: this.props.friendList, groupId: event.target.value }
        });
    }

    handleCheckedClick = id => event => {
        const selectedFriends = this.state.selectedFriends.map(friend => {
            if (friend.id === id) {
                return { ...friend, checked: event.target.checked, };
            }
            return friend;
        });

        this.setState({ selectedFriends: [...selectedFriends,] });
    }

    // change state data by property name when the input data changes
    handleChangeFor = property => event => {
        this.setState({ [property]: event.target.value });
    }

    handleSubmitClick = event => {
        event.preventDefault();

        if (this.state.selectedFriends.length === 0) {
            alert('You should select at least one friend');
        } else {
            let imageFile = new FormData();
            imageFile.append('file', this.uploadInput.files[0]);

            this.props.dispatch({ type: 'MAKE_NEW_INVITATION', payload: { imageFile: imageFile, form: this.state } });
            this.props.history.push('/main');
        }
    }

    loadImageFile = () => {
        let ImagePre;
        let ImgReader = new FileReader();

        ImgReader.onload = (Event) => {
            if (!ImagePre) {
                let newPreview = document.getElementById("imagePreview");
                ImagePre = new Image();
                ImagePre.style.width = "200px";
                ImagePre.style.height = "140px";
                newPreview.appendChild(ImagePre);
            }
            ImagePre.src = Event.target.result;
        };
        let img = document.getElementById("image").files;

        ImgReader.readAsDataURL(img[0]);
    }

    // get group and friend lists from redux and saga
    componentDidMount = () => {
        this.props.dispatch({ type: 'GROUP_LIST' });
        this.props.dispatch({ type: 'FRIEND_LIST' });
    }

    render() {
        return (
            <div>
                <h2>Make an Invitation</h2>
                <form onSubmit={this.handleSubmitClick} encType="multipart/form-data">
                    <label htmlFor="title">Title : </label>
                    <input id="title" name="title" type="text" value={this.state.title} onChange={this.handleChangeFor('title')} /><br />
                    <label htmlFor="image">Image : </label>
                    <input id="image" name="image" type="file" multiple={false}
                        ref={(ref) => { this.uploadInput = ref; }}
                        accept="image/*"
                        onChange={this.loadImageFile}
                    /><br />
                    <div id="imagePreview"></div>
                    <label htmlFor="message">Message : </label>
                    <input id="message" name="message" type="text" value={this.state.message} onChange={this.handleChangeFor('message')} /><br />
                    <label htmlFor="secretMsg">Secret Message : </label>
                    <input id="secretMsg" name="secretMsg" type="text" value={this.state.secretMessage} onChange={this.handleChangeFor('secretMessage')} /><br />
                    <label htmlFor="date">Date : </label>
                    <input id="date" name="date" type="date" value={this.state.endDate} onChange={this.handleChangeFor('endDate')} /><br />
                    <label htmlFor="location">Location : </label>
                    <input id="location" name="location" type="text" value={this.state.location} onChange={this.handleChangeFor('location')} /><br />
                    <label htmlFor="friendList">Friends : </label>
                    <select id="groupList" name="groupList" onChange={this.handleGroupChange}>
                        <option value="0">All Groups</option>
                        {this.props.groupList.map(group =>
                            <option key={group.id} value={group.id}>{group.group_name}</option>
                        )}
                    </select>
                    <select id="friendList" name="friendList">
                        <option value="0">All</option>
                        {this.props.friendListByGroupId.map(friend =>
                            <option key={friend.id} value={friend.id}>{friend.friend_name}</option>
                        )}
                    </select>
                    <button onClick={this.handleAddClick}>Add Friend</button><br />
                    <label htmlFor="selectedFriendList">Invited Friends : </label>
                    <table id="selectedFriendList">
                        <thead>
                            <tr>
                                <th>Check</th>
                                <th>Name</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.selectedFriends.map(friend =>
                                <tr key={friend.id}>
                                    <td><input type="checkbox" value={friend.checked} onClick={this.handleCheckedClick(friend.id)} /></td>
                                    <td>{friend.friend_name}</td>
                                    <td><button onClick={this.handleDeleteClick(friend.id)}>Delete</button></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <button type="submit">Send</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    groupList: state.groupList,
    friendList: state.friendList.friendList,
    friendListByGroupId: state.friendList.friendListByGroupId,
});

export default connect(mapStateToProps)(withRouter(NewInvitation));