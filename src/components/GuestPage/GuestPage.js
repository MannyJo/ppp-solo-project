import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const id = Number(window.location.hash.split('/').pop());

class GuestPage extends Component {
    state = {
        email: 'spears@so.dangerous',
    }

    handleLoginClick = event => {
        event.preventDefault();
        this.props.dispatch({ type: 'VERIFY_GUEST', payload: { email: this.state.email, id: id }});
    }

    handleChange = event => {
        this.setState({ email: event.target.value });
    }

    componentDidMount = () => {
        this.props.dispatch({ type: 'IS_VERIFIED', payload: false });
    }

    render() {
        const detail = this.props.invitation;
        return (
            <div>
                {
                    !this.props.isVerified?
                    (
                        <form onSubmit={this.handleLoginClick}>
                            <label htmlFor="guestLogin">Email : </label>
                            <input type="email" id="guestLogin" value={this.state.email} onChange={this.handleChange} placeholder="example@example.com" /><br />
                            <input type="submit" value="Login" />
                        </form>
                    ) :
                    (
                        <div style={{textAlign: 'center'}}>
                            <div style={{fontSize: '25px'}}>{detail.title}</div>
                            <div><img src={detail.img_url} style={{height: '200px'}} /></div>
                            <div>{detail.message}</div>
                            {
                                detail.show_secret?
                                <div style={{color: 'purple'}}>{detail.secret_message}</div> :
                                null
                            }
                            <div>Date : {detail.end_date}</div>
                            <div>Address : {detail.address}</div>
                        </div>
                    )
                }
            </div>
        );
    }
}

const mapStateToProps = ({ guestInfo }) => ({ 
    isVerified: guestInfo.isVerified, 
    invitation: guestInfo.invitation 
});

export default connect(mapStateToProps)(withRouter(GuestPage));