import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class EventDetail extends Component {

    componentDidMount = () => {
        const id = window.location.hash.split('/').pop();
        
        this.props.dispatch({ type: 'EVENT_DETAIL', payload: id });
    }

    render() {
        return (
            <div>
                <h2>Event Detail Page</h2>
                <div>
                    {/* <div>{this.props.detail.title}</div> */}
                </div>
                <pre>
                    {JSON.stringify(this.props.state, null, 2)}
                </pre>
            </div>
        );
    }
}

const mapStateToProps = state => ({ state });

export default connect(mapStateToProps)(withRouter(EventDetail));