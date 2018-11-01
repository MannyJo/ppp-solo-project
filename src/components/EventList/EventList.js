import React, { Component } from 'react';
import { connect } from 'react-redux';
import EventListItem from '../EventListItem/EventListItem';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import styles from './EventListStyles';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import AddIcon from '@material-ui/icons/Add';
import Search from '@material-ui/icons/Search';

class EventList extends Component {
    state = {
        searchWord: '',
        month: '',
        year: '',
    }

    handleChangeFor = property => event => {
        this.setState({
            [property]: event.target.value,
        });
    }

    searchEventByClick = property => event => {
        switch (property) {
            case 'year':
                this.setState({ year: event.target.value });
                break;
            case 'month':
                this.setState({ month: event.target.value });
                break;
            default:
                break;
        }
        
        this.props.dispatch({ type: 'EVENT_LIST_BY_KEYWORD', payload: {...this.state, [property]: event.target.value }});
    }

    searchEventByKeyword = event => {
        event.preventDefault();
        this.props.dispatch({ type: 'EVENT_LIST_BY_KEYWORD', payload: this.state });
    }

    handleNewClick = () => {
        this.props.history.push('/new');
    }

    componentDidMount = () => {
        this.props.dispatch({ type: 'EVENT_LIST' });
    }

    render() {
        const classes = this.props.classes;
        return (
            <Paper className={classes.root}>
                <Toolbar className={classes.toolbar}>
                    <h2 className={classes.title}>Plans</h2>
                    <Button variant="extendedFab" className={classes.button} onClick={this.handleNewClick}>
                        <AddIcon />
                    </Button>
                    <div className={classes.grow} />
                    <select className={classes.searchSelect} onChange={this.searchEventByClick('year')}>
                        <option value="">Year</option>
                        <option value="2019">2019</option>
                        <option value="2018">2018</option>
                    </select> &nbsp;
                    <select className={classes.searchSelect} onChange={this.searchEventByClick('month')}>
                        <option value="">Month</option>
                        <option value="1">Jan</option>
                        <option value="2">Feb</option>
                        <option value="3">Mar</option>
                        <option value="4">Apr</option>
                        <option value="5">May</option>
                        <option value="6">Jun</option>
                        <option value="7">Jul</option>
                        <option value="8">Aug</option>
                        <option value="9">Sep</option>
                        <option value="10">Oct</option>
                        <option value="11">Nov</option>
                        <option value="12">Dec</option>
                    </select>
                    <form onSubmit={this.searchEventByKeyword} className={classes.search}>
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
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell numeric>#</TableCell>
                            <TableCell className={classes.center}>Title</TableCell>
                            <TableCell className={classes.center}>Exp. Date</TableCell>
                            <TableCell className={classes.iconColumn}></TableCell>
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

export default connect(mapStateToProps)(withRouter(withStyles(styles)(EventList)));