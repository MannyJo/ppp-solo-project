import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class EventDetail extends Component {
    handleBackClick = () => {
        console.log(this.props.history);
        this.props.history.goBack();
    }

    componentDidMount = () => {
        const id = window.location.hash.split('/').pop();
        this.props.dispatch({ type: 'EVENT_DETAIL', payload: id });
    }

    render() {
        const detail = this.props.detail;
        const members = this.props.members;
        return (
            <div style={{textAlign: 'center'}}>
                <h2>Event Detail Page</h2>
                <div>
                    <div>{detail.title}</div>
                    <div><img src={detail.img_url} style={{height: '200px'}} /></div>
                    <div>{detail.message}</div>
                    <div>{detail.secret_message}</div>
                    <div>Date : {detail.end_date}</div>
                    <div>Address : {detail.address}</div>
                    <div>
                        Members : 
                        {members.map(member => <div key={member.id}>{member.friend_name} </div>)}
                    </div>
                    <div><button onClick={this.handleBackClick}>Back</button></div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ eventDetail }) => ({
    detail: eventDetail.detail,
    members: eventDetail.members,
});

export default connect(mapStateToProps)(withRouter(EventDetail));