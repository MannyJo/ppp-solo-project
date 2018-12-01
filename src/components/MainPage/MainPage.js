import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import EventList from '../EventList/EventList';

const styles = () => ({
    subTitle: {
        marginLeft: '12vw',
        fontSize: '20px',
    },
    welcome: {
        textAlign: 'center',
    },
});

class MainPage extends Component {
    handleNewClick = () => {
        this.props.history.push('/new');
    }

    render() {
        const classes = this.props.classes;
        return (
            <div>
                <h1 className={classes.welcome}>Welcome, {this.props.user.user_name}!</h1>
                <EventList />
            </div>
        );
    }
}

const mapStateToProps = ({user}) => ({user});

export default connect(mapStateToProps)(withRouter(withStyles(styles)(MainPage)));