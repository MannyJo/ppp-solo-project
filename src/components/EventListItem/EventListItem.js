import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

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
        return (
            <tr>
                <td>{this.props.event.number}</td>
                <td>
                    <button onClick={this.sendToDetail}>{this.props.event.title}</button>
                </td>
                <td>{this.props.event.end_date}</td>
                <td><button>Update</button></td>
                <td><button onClick={this.handleDeleteClick(this.props.event.id)}>Delete</button></td>
            </tr>
        );
    }
}

export default connect()(withRouter(EventList));