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
import FriendPageForm from '../FriendPageForm/FriendPageForm';
import FriendPageFormUpdate from '../FriendPageFormUpdate/FriendPageFormUpdate';
import Edit from '@material-ui/icons/Edit';

const styles = theme => ({
    frame: {
        minWidth: '800px',
        maxWidth: '1000px',
        overflowX: 'auto',
        margin: 'auto',
    },
    center: {
        textAlign: 'center',
    },
});

class GroupPage extends Component {
    handleDeleteClick = friend => () => {
        if(window.confirm('Want to delete?')) {
            this.props.dispatch({ type: 'DELETE_FRIEND', payload: friend });
        }
    }

    handleUpdateFriend = friend => event => {
        this.props.dispatch({ type: 'UPDATE_FRIEND_INFO', payload: friend });
        this.props.dispatch({ type: 'OPEN_DIALOG' });
    }

    componentDidMount = () => {
        this.props.dispatch({ type: 'FRIEND_LIST' });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <h2>Friends</h2>
                <div className={classes.frame}>
                    <FriendPageForm />
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.center}>Group</TableCell>
                                    <TableCell className={classes.center}>Name</TableCell>
                                    <TableCell className={classes.center}>E-Mail</TableCell>
                                    <TableCell className={classes.center}>Update</TableCell>
                                    <TableCell className={classes.center}>Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.friendList.map(friend => 
                                    <TableRow hover key={friend.id}>
                                        <TableCell className={classes.center}>{friend.group_name}</TableCell>
                                        <TableCell className={classes.center}>{friend.friend_name}</TableCell>
                                        <TableCell className={classes.center}>{friend.friend_email}</TableCell>
                                        <TableCell className={classes.center}>
                                            <Button onClick={this.handleUpdateFriend(friend)} color="primary">
                                                <Edit />
                                            </Button>
                                        </TableCell>
                                        <TableCell className={classes.center}>
                                            <Button color="secondary" onClick={this.handleDeleteClick(friend)}>
                                                <Delete />
                                            </Button>
                                        </TableCell>
                                    </TableRow>    
                                )}
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
                {this.props.dialogOpen?<FriendPageFormUpdate />:null}
            </div>
        );
    }
}

const mapStateToProps = state => ({ 
    dialogOpen: state.dialogOpen,
    friendList: state.friendList.friendList,
});

export default connect(mapStateToProps)(withStyles(styles)(GroupPage));