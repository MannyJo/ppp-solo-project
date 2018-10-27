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

const styles = theme => ({
    frame: {
        width: '800px',
        margin: 'auto',
    },
    form: {
        textAlign: 'center',
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
        newGroupName: '',
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

    handleSubmit = event => {
        event.preventDefault();
        this.props.dispatch({ type: 'ADD_GROUP', payload: this.state });
        this.setState({ newGroupName: '' });
    }

    componentDidMount = () => {
        this.props.dispatch({ type: 'GROUP_LIST' });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <h2>Groups</h2>
                <div className={classes.frame}>
                    <form onSubmit={this.handleSubmit} className={classes.form}>
                        <label htmlFor="groupInput">Group : </label>
                        <input 
                            type="text" 
                            value={this.state.newGroupName} 
                            placeholder="Group Name"
                            onChange={this.handleChangeFor('newGroupName')} 
                            className={classes.input}
                        />&nbsp;
                        <Button variant="outlined" color="primary" type="submit">Add Group</Button>
                    </form>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.center}>Name</TableCell>
                                    <TableCell className={classes.center}># of Members</TableCell>
                                    <TableCell className={classes.center}>Update</TableCell>
                                    <TableCell className={classes.center}>Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.groupList.map(group =>
                                    <TableRow key={group.id}>
                                        <TableCell className={classes.center}>{group.group_name}</TableCell>
                                        <TableCell className={classes.center}>{group.members}</TableCell>
                                        <TableCell className={classes.center}><Button color="primary">Update</Button></TableCell>
                                        <TableCell className={classes.center}><Button color="secondary" onClick={this.handleDeleteClick(group)}>Delete</Button></TableCell>
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

const mapStateToProps = ({ groupList }) => ({ groupList });

export default connect(mapStateToProps)(withStyles(styles)(GroupPage));