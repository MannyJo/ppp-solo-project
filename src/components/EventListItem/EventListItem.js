import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Delete from '@material-ui/icons/Delete';
import swal from 'sweetalert2';

const styles = () => ({
    center: {
        textAlign: 'center',
    },
    title: {
        width: '40%'
    },
    iconColumn: {
        textAlign: 'center',
        width: '150px',
    }
});

class EventList extends Component {
    handleDeleteClick = deleteEvent => () => {
        swal({
            title: 'Are you sure?',
            html: "<b style='color:hotpink'>" + deleteEvent.title + "</b> will be deleted!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                this.props.dispatch({ type: 'DELETE_EVENT', payload: deleteEvent.id });
                swal(
                    'Deleted!',
                    deleteEvent.title + ' has been deleted.',
                    'success'
                );
            }
        });
    }

    sendToDetail = () => {
        this.props.history.push(`/detail/${this.props.event.id}`);
    }

    render() {
        const classes = this.props.classes;
        return (
            <TableRow hover>
                <TableCell onClick={this.sendToDetail} numeric>{this.props.event.number}</TableCell>
                <TableCell onClick={this.sendToDetail} className={classes.title}>
                    {this.props.event.title}
                </TableCell>
                <TableCell onClick={this.sendToDetail} className={classes.center}>{this.props.event.end_date}</TableCell>
                <TableCell className={classes.iconColumn}>
                    <Button color="secondary" onClick={this.handleDeleteClick(this.props.event)}>
                        <Delete />
                    </Button>
                </TableCell>
            </TableRow>
        );
    }
}

export default connect()(withRouter(withStyles(styles)(EventList)));