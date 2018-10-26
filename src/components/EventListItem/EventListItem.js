import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    center: {
        textAlign: 'center',
    }, 
    title: {
        width: '40%'
    }
});

class EventList extends Component {
    handleDeleteClick = eventId => () => {
        if(window.confirm('Do you want to delete this invitation?')){
            this.props.dispatch({ type: 'DELETE_EVENT', payload: eventId });
        }
    }

    sendToDetail = () => {
        this.props.history.push(`/detail/${this.props.event.id}`);
    }

    render() {
        const classes = this.props.classes;
        return (
            <TableRow>
                <TableCell numeric>{this.props.event.number}</TableCell>
                <TableCell onClick={this.sendToDetail} className={classes.title}>
                    {this.props.event.title}
                </TableCell>
                <TableCell className={classes.center}>{this.props.event.end_date}</TableCell>
                <TableCell className={classes.center}><Button color="primary">Update</Button></TableCell>
                <TableCell className={classes.center}><Button color="secondary" onClick={this.handleDeleteClick(this.props.event.id)}>Delete</Button></TableCell>
            </TableRow>
        );
    }
}

export default connect()(withRouter(withStyles(styles)(EventList)));