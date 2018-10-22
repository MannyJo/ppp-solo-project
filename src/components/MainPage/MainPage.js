import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class MainPage extends Component {

    componentDidMount = () => {
        this.props.dispatch({ type: 'EVENT_LIST' });
    }

    render() {
        return (
            <div>
                <h1 id="welcome">
                    Welcome, { this.props.user.user_name }!
                </h1>
                <div>
                    <div>- Your History</div>
                    <div><button>New Invitation</button></div>
                    <table style={{border:'1px solid black'}}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Exp. Date</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.eventList.map(event => (
                                <tr key={event.id}>
                                    <td>{event.number}</td>
                                    <td>{event.title}</td>
                                    <td>{event.end_date}</td>
                                    <td><button>Update</button></td>
                                    <td><button>Delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
  user: state.user,
  eventList: state.eventList,
});

export default connect(mapStateToProps)(MainPage);