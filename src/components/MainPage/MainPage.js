import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import EventList from '../EventList/EventList';
import Add from '@material-ui/icons/Add';

const styles = theme => ({
    subTitle: {
        marginLeft: '12vw',
        fontSize: '20px',
    },
    right: {
        textAlign: 'right',
        marginRight: '12vw',
    },
    welcome: {
        marginLeft: '10vw',
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
                <div>
                    <div className={classes.subTitle}>- Your History</div>
                    <div className={classes.right}>
                        <Button variant="outlined" color="primary" onClick={this.handleNewClick}><Add /> Invitation</Button>
                    </div>
                    <EventList />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps)(withRouter(withStyles(styles)(MainPage)));