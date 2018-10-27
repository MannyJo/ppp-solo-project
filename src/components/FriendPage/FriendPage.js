import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Delete from '@material-ui/icons/Delete';

const styles = theme => ({
    frame: {
        width: '1000px',
        margin: 'auto',
    },
    form: {
        textAlign: 'center',
        marginBottom: '10px',
    },
    input: {
        padding: '12px 20px',
        margin: '8px 0',
        display: 'inline-block',
        border: '1px solid #ccc',
        boxSizing: 'border-box',
        borderRadius: '5px',
    },
    center: {
        textAlign: 'center',
    }
});

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
        const { classes } = this.props;
        return (
            <div>
                <h2>Friends</h2>
                <div className={classes.frame}>
                    <form onSubmit={this.handleSubmit} className={classes.form}>
                        <label htmlFor="friendInput">Friend : </label>
                        <input 
                            type="text" 
                            id="friendInput" 
                            value={this.state.friendName} 
                            placeholder="Friend's Name"
                            onChange={this.handleChangeFor('friendName')} 
                            className={classes.input}
                            required 
                        />&nbsp;&nbsp;
                        <label htmlFor="emailInput">E-Mail : </label>
                        <input 
                            type="email" 
                            id="emailInput" 
                            value={this.state.friendEmail} 
                            placeholder="Friend's E-Mail"
                            onChange={this.handleChangeFor('friendEmail')} 
                            className={classes.input}
                            required 
                        />&nbsp;&nbsp;
                        <label htmlFor="groupList">Group : </label>
                        <select id="groupList" name="groupList" onChange={this.handleChangeFor('groupId')} required>
                            <option value="">select</option>
                            {this.props.groupList.map(group =>
                                <option key={group.id} value={group.id}>{group.group_name}</option>
                            )}
                        </select>&nbsp;
                        <Button variant="outlined" color="primary" type="submit">Add Group</Button>
                    </form>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Group</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>E-Mail</TableCell>
                                    <TableCell>Update</TableCell>
                                    <TableCell>Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.friendList.map(friend => 
                                    <TableRow key={friend.id}>
                                        <TableCell>{friend.group_name}</TableCell>
                                        <TableCell>{friend.friend_name}</TableCell>
                                        <TableCell>{friend.friend_email}</TableCell>
                                        <TableCell><Button>Update</Button></TableCell>
                                        <TableCell><Button color="secondary" onClick={this.handleDeleteClick(friend)}><Delete /></Button></TableCell>
                                    </TableRow>    
                                )}
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({ 
    groupList: state.groupList,
    friendList: state.friendList.friendList 
});

export default connect(mapStateToProps)(withStyles(styles)(GroupPage));