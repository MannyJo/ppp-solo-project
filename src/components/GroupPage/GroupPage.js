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
import GroupPagePopupForm from '../GroupPagePopupForm/GroupPagePopupForm';
import Edit from '@material-ui/icons/Edit';
import Search from '@material-ui/icons/Search';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import styles from './GroupPageStyles';
import AddIcon from '@material-ui/icons/Add';
import swal from 'sweetalert2';

class GroupPage extends Component {
    state = {
        updateGroup: '',
        update: false,
        searchWord: '',
    }

    handleChangeFor = property => event => {
        this.setState({
            [property]: event.target.value,
        });
    }

    // delete group function
    handleDeleteClick = group => () => {
        swal({
            title: 'Are you sure?',
            html: "<b style='color:hotpink'>" + group.group_name + "</b> will be deleted!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                if (group.members > 0) {
                    swal(
                        'Failed!?',
                        'There are still members in this group.',
                        'error'
                    );
                } else {
                    this.props.dispatch({ type: 'DELETE_GROUP', payload: group });
                    swal(
                        'Deleted!',
                        group.group_name + ' has been deleted.',
                        'success'
                    );
                }
            }
        });
    }

    handleUpdateClick = group => () => {
        this.setState({ updateGroup: group, update: true });
        this.props.dispatch({ type: 'OPEN_DIALOG' });
    }

    handleAddClick = () => {
        this.setState({ update: false });
        this.props.dispatch({ type: 'OPEN_DIALOG' });
    }

    // user can search group by keyword
    searchGroup = event => {
        event.preventDefault();
        this.props.dispatch({ type: 'GROUP_LIST_BY_KEYWORD', payload: this.state.searchWord })
        this.setState({ searchWord: '' });
    }

    componentDidMount = () => {
        this.props.dispatch({ type: 'GROUP_LIST' });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <div className={classes.frame}>
                    <Paper>
                        <Toolbar className={classes.toolbar}>
                            <h2 className={classes.title}>Groups</h2>
                            <Button variant="extendedFab" className={classes.button} onClick={this.handleAddClick}>
                                <AddIcon />
                            </Button>
                            <div className={classes.grow} />
                            <form onSubmit={this.searchGroup} className={classes.search}>
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
                                    <TableCell className={classes.center}>Name</TableCell>
                                    <TableCell className={classes.center}># of Members</TableCell>
                                    <TableCell className={classes.center}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.groupList.map(group =>
                                    <TableRow hover key={group.id}>
                                        <TableCell className={classes.center}>{group.group_name}</TableCell>
                                        <TableCell className={classes.center}>{group.members}</TableCell>
                                        <TableCell className={classes.iconColumn}>
                                            <Button color="primary" onClick={this.handleUpdateClick(group)}>
                                                <Edit />
                                            </Button>&nbsp;/&nbsp;
                                            <Button color="secondary" onClick={this.handleDeleteClick(group)}>
                                                <Delete />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
                {this.props.dialogOpen?<GroupPagePopupForm group={this.state.updateGroup} update={this.state.update} />:null}
            </div>
        );
    }
}

const mapStateToProps = ({ groupList, dialogOpen }) => ({ groupList, dialogOpen });

export default connect(mapStateToProps)(withStyles(styles)(GroupPage));