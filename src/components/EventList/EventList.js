import React, { Component } from 'react';
import { connect } from 'react-redux';

import EventListItem from '../EventListItem/EventListItem';

class EventList extends Component {

    componentDidMount = () => {
        this.props.dispatch({ type: 'EVENT_LIST' });
    }

    render() {
        return (
            <table>
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
                    {this.props.eventList.map(event => <EventListItem key={event.id} event={event} />)}
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = state => ({
    eventList: state.eventList,
});

export default connect(mapStateToProps)(EventList);