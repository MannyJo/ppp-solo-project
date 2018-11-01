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
import FriendPagePopupForm from '../FriendPagePopupForm/FriendPagePopupForm';
import Edit from '@material-ui/icons/Edit';
import styles from './FriendPageStyles';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import AddIcon from '@material-ui/icons/Add';
import Search from '@material-ui/icons/Search';
import swal from 'sweetalert2';

class FriendPage extends Component {
    state = {
        update: false,
        groupId: '',
        searchWord: '',
    }

    handleChangeFor = property => event => {
        this.setState({
            [property]: event.target.value,
        });
    }

    handleDeleteClick = friend => () => {
        swal({
            title: 'Are you sure?',
            html: "<b style='color:hotpink'>" + friend.friend_name + "</b> will be deleted!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                this.props.dispatch({ type: 'DELETE_FRIEND', payload: friend });
                swal(
                    'Deleted!',
                    friend.friend_name + ' has been deleted.',
                    'success'
                );
            }
        });
    }

    handleAddClick = () => {
        this.setState({ update: false });
        this.props.dispatch({ type: 'OPEN_DIALOG' });
    }

    handleUpdateFriend = friend => event => {
        this.setState({ update: true });
        this.props.dispatch({ type: 'UPDATE_FRIEND_INFO', payload: friend });
        this.props.dispatch({ type: 'OPEN_DIALOG' });
    }

    searchFriendByGroupId = event => {
        this.setState({ groupId: event.target.value });
        this.props.dispatch({ type: 'FRIEND_LIST_BY_KEYWORD', payload: { ...this.state, groupId: event.target.value } });
    }

    searchFriendByKeyword = event => {
        event.preventDefault();
        this.props.dispatch({ type: 'FRIEND_LIST_BY_KEYWORD', payload: this.state });
        this.setState({ searchWord: '' });
    }

    componentDidMount = () => {
        this.props.dispatch({ type: 'GROUP_LIST' });
        this.props.dispatch({ type: 'FRIEND_LIST' });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <div className={classes.frame}>
                    <Paper>
                        <Toolbar className={classes.toolbar}>
                            <h2 className={classes.title}>Friends</h2>
                            <Button variant="extendedFab" className={classes.button} onClick={this.handleAddClick}>
                                <AddIcon />
                            </Button>
                            <div className={classes.grow} />
                            <select className={classes.searchSelect} onChange={this.searchFriendByGroupId}>
                                <option value="">All Group</option>
                                {this.props.groupList.map(group => <option key={group.id} value={group.id}>{group.group_name}</option>)}
                            </select>
                            <form onSubmit={this.searchFriendByKeyword} className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <Search />
                                </div>
                                <InputBase
                                    placeholder="Search…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    value={this.state.searchWord}
                                    onChange={this.handleChangeFor('searchWord')}
                                />
                            </form>
                        </Toolbar>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.center}>Group</TableCell>
                                    <TableCell className={classes.center}>Name</TableCell>
                                    <TableCell className={classes.center}>E-Mail</TableCell>
                                    <TableCell className={classes.center}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.friendList.map(friend =>
                                    <TableRow hover key={friend.id}>
                                        <TableCell className={classes.center}>{friend.group_name}</TableCell>
                                        <TableCell className={classes.center}>{friend.friend_name}</TableCell>
                                        <TableCell className={classes.center}>{friend.friend_email}</TableCell>
                                        <TableCell className={classes.iconColumn}>
                                            <Button onClick={this.handleUpdateFriend(friend)} color="primary">
                                                <Edit />
                                            </Button>&nbsp;/&nbsp;
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
                {this.props.dialogOpen ? <FriendPagePopupForm update={this.state.update} /> : null}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    dialogOpen: state.dialogOpen,
    groupList: state.groupList,
    friendList: state.friendList.friendList,
});

export default connect(mapStateToProps)(withStyles(styles)(FriendPage));