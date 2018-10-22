import React, { Component } from 'react';
import { connect } from 'react-redux';

class EventList extends Component {
    handleDeleteClick = eventId => () => {
        console.log(eventId);
        if(window.confirm('Do you want to delete this invitation?')){
            this.props.dispatch({ type: 'DELETE_EVENT', payload: eventId });
        }
    }

    render() {
        return (
            <tr>
                <td>{this.props.event.number}</td>
                <td>{this.props.event.title}</td>
                <td>{this.props.event.end_date}</td>
                <td><button>Update</button></td>
                <td><button onClick={this.handleDeleteClick(this.props.event.id)}>Delete</button></td>
            </tr>
        );
    }
}

export default connect()(EventList);