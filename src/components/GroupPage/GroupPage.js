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

    handleDeleteClick = group => () => {
        if (group.members > 0) {
            alert('Can remove this group because of the members');
        } else if (window.confirm('Want to delete?')) {
            this.props.dispatch({ type: 'DELETE_GROUP', payload: group });
        }
    }

    handleUpdateClick = group => () => {
        this.setState({ updateGroup: group, update: true });
        this.props.dispatch({ type: 'OPEN_DIALOG' });
    }

    handleAddClick = () => {
        this.setState({ update: false });
        this.props.dispatch({ type: 'OPEN_DIALOG' });
    }

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