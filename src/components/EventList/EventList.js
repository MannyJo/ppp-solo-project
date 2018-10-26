import React, { Component } from 'react';
import { connect } from 'react-redux';
import EventListItem from '../EventListItem/EventListItem';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
        width: '80vw',
        minWidth: 700,
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
        marginLeft: '10vw',
        marginRight: '10vw',
    },
    table: {
        minWidth: 700,
    },
    center: {
        textAlign: 'center',
    }
});

class EventList extends Component {

    componentDidMount = () => {
        this.props.dispatch({ type: 'EVENT_LIST' });
    }

    render() {
        const classes = this.props.classes;
        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell numeric>#</TableCell>
                            <TableCell className={classes.center}>Title</TableCell>
                            <TableCell className={classes.center}>Exp. Date</TableCell>
                            <TableCell className={classes.center}>Update</TableCell>
                            <TableCell className={classes.center}>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.eventList.map(event => <EventListItem key={event.id} event={event} />)}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

const mapStateToProps = state => ({
    eventList: state.eventList,
});

export default connect(mapStateToProps)(withStyles(styles)(EventList));