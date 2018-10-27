import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    newFrame: {
        backgroundColor: '#dbd5d5aa',
        width: '530px',
        margin: '20px auto',
        padding: '4px',
        borderRadius: '10px',
    },
    newForm: {
        backgroundColor: 'white',
        width: '500px',
        padding: '15px',
        borderRadius: '10px',
    },
    input: {
        width: '100%',
        padding: '12px 20px',
        margin: '8px 0',
        display: 'inline-block',
        border: '1px solid #ccc',
        boxSizing: 'border-box',
    },
    secret: {
        width: '100%',
        padding: '12px 20px',
        margin: '8px 0',
        display: 'inline-block',
        border: '1px solid #ccc',
        boxSizing: 'border-box',
        color: 'blue',
    },
    select: {
        width: '140px',
        height: '35px',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    noDisplay: {
        display: 'none',
    },
    center: {
        textAlign: 'center',
    },
    friendName: {
        width: '70%',
        textAlign: 'center',
    },
    bottomLine: {
        textAlign: 'right',
    },
    bottomButton: {
        margin: '10px',
    }
});

class InvitationForm extends Component {
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
        let ImgReader = new FileReader();

        ImgReader.onload = (Event) => {
            let newPreview = document.getElementById("imagePreview");
            let ImagePre = new Image();
            
            if(newPreview.hasChildNodes()){
                newPreview.removeChild(newPreview.firstChild);
            }

            ImagePre.style.width = "500px";
            newPreview.appendChild(ImagePre);
            ImagePre.src = Event.target.result;
        };

        let img = document.getElementById("image").files;
        ImgReader.readAsDataURL(img[0]);
    }

    sendToMain = event => {
        event.preventDefault();
        this.props.history.goBack();
    }

    // get group and friend lists from redux and saga
    componentDidMount = () => {
        this.props.dispatch({ type: 'GROUP_LIST' });
        this.props.dispatch({ type: 'FRIEND_LIST' });
    }

    render() {
        const classes = this.props.classes;
        return (
            <div>
                <h2>Make an Invitation</h2>
                <form onSubmit={this.handleSubmitClick} className={classes.newFrame}>
                    <div className={classes.newForm}>
                        <label htmlFor="title">Title</label>
                        <input
                            id="title" name="title" type="text"
                            value={this.state.title}
                            onChange={this.handleChangeFor('title')}
                            className={classes.input}
                        />
                        <label htmlFor="image">Image</label>
                        <input id="image" name="image" type="file" multiple={false}
                            ref={(ref) => { this.uploadInput = ref; }}
                            accept="image/*"
                            onChange={this.loadImageFile}
                            className={classes.input}
                        />
                        <div id="imagePreview"></div>
                        <label htmlFor="message">Message</label>
                        <input id="message" name="message" type="text"
                            value={this.state.message}
                            onChange={this.handleChangeFor('message')}
                            className={classes.input}
                        />
                        <label htmlFor="secretMsg">Secret Message</label>
                        <input id="secretMsg" name="secretMsg" type="text"
                            value={this.state.secretMessage}
                            onChange={this.handleChangeFor('secretMessage')}
                            className={classes.secret}
                        />
                        <label htmlFor="date">Date : </label>
                        <TextField
                            id="date"
                            name="date"
                            type="date"
                            value={this.state.endDate}
                            className={classes.textField}
                            onChange={this.handleChangeFor('endDate')}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                        /><br /><br />
                        <label htmlFor="location">Location</label>
                        <input id="location" name="location" type="text"
                            value={this.state.location}
                            onChange={this.handleChangeFor('location')}
                            className={classes.input}
                        />
                        <label htmlFor="friendList">Friends : </label>
                        <select id="groupList" name="groupList"
                            onChange={this.handleGroupChange}
                            className={classes.select}
                        >
                            <option value="0">All Groups</option>
                            {this.props.groupList.map(group =>
                                <option key={group.id} value={group.id}>{group.group_name}</option>
                            )}
                        </select>&nbsp;
                        <select id="friendList" name="friendList"
                            className={classes.select}
                        >
                            <option value="0">All</option>
                            {this.props.friendListByGroupId.map(friend =>
                                <option key={friend.id} value={friend.id}>{friend.friend_name}</option>
                            )}
                        </select>&nbsp;
                        <Button variant="outlined" color="primary" onClick={this.handleAddClick}>Add Friend</Button><br /><br />
                        <div className={this.state.selectedFriends.length > 0 ? null : classes.noDisplay}>
                            <label htmlFor="selectedFriendList">Invited Friends</label>
                            <Table id="selectedFriendList">
                                <TableHead>
                                    <TableRow>
                                        <TableCell className={classes.center}>Secret<br />Message</TableCell>
                                        <TableCell className={classes.center}>Name</TableCell>
                                        <TableCell className={classes.center}>Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.selectedFriends.map(friend =>
                                        <TableRow key={friend.id}>
                                            <TableCell className={classes.center}><input type="checkbox" value={friend.checked} onClick={this.handleCheckedClick(friend.id)} /></TableCell>
                                            <TableCell className={classes.friendName}>{friend.friend_name}</TableCell>
                                            <TableCell className={classes.center}><button onClick={this.handleDeleteClick(friend.id)}>Delete</button></TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                    <div className={classes.bottomLine}>
                        <Button
                            onClick={this.sendToMain}
                            variant="contained"
                            color="secondary"
                            type="submit"
                            className={classes.bottomButton}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={classes.bottomButton}
                        >
                            Send
                        </Button>
                    </div>
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

export default connect(mapStateToProps)(withRouter(withStyles(styles)(InvitationForm)));