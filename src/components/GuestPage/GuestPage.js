import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { Map, InfoWindow, GoogleApiWrapper, Marker } from 'google-maps-react';
import styles from './GuestPageStyles';
import swal from 'sweetalert2';

const API_KEY = 'AIzaSyA8ALSMNJnujiOFPjfzNmT8CzBEVdqIsj4';
const id = Number(window.location.hash.split('/').pop());

class GuestPage extends Component {
    state = {
        email: '',
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
    }

    handleLoginClick = event => {
        event.preventDefault();
        this.props.dispatch({ type: 'VERIFY_GUEST', payload: { email: this.state.email, id: id } });
    }

    handleChange = event => {
        this.setState({ email: event.target.value });
    }

    changeUser = () => {
        this.setState({ email: 'mansangjo2018@gmail.com' });
    }

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }

    clickAnswer = attendCd => () => {
        this.props.dispatch({ 
            type: 'SEND_ATTEND_CD', 
            payload: {
                email: this.state.email,
                eventId: this.props.invitation.id,
                friendId: this.props.invitation.friend_id,
                attendCd: attendCd
            } 
        });

        swal({
            title: 'Updated!',
            text: 'Your reply has been updated.',
            type: 'success',
            timer: 1000,
            showCloseButton: false,
            showConfirmButton: false,
            showCancelButton: false,
        });
    }

    componentDidMount = () => {
        this.props.dispatch({ type: 'IS_VERIFIED', payload: false });
    }

    render() {
        const detail = this.props.invitation;
        const { classes } = this.props;
        return (
            <div>
                {
                    !this.props.isVerified ?
                        (
                            <form onSubmit={this.handleLoginClick} className={classes.guestLoginFrame}>
                                <label
                                    htmlFor="guestLogin"
                                    onClick={this.changeUser}
                                >
                                    Email
                                </label>
                                <input
                                    type="email" id="guestLogin" value={this.state.email}
                                    onChange={this.handleChange}
                                    placeholder="example@example.com"
                                    className={classes.input}
                                /><br />
                                <Button
                                    type="submit"
                                    className={classes.input}
                                    color="primary"
                                    variant="outlined"
                                >
                                    Login
                                </Button>
                            </form>
                        ) :
                        (
                            <div className={classes.displayFlex}>
                                <div className={classes.detailFrame}>
                                    <div className={classes.title}>
                                        <strong>{detail.title}</strong>
                                    </div>
                                    <div><img src={detail.img_url} className={classes.image} alt={detail.title} /></div>
                                    <div className={classes.message}>{detail.message}</div>
                                    {
                                        detail.show_secret ?
                                            <div className={classes.secretMessage}>{detail.secret_message}</div> :
                                            null
                                    }
                                    <div className={classes.left}>
                                        <div className={classes.label}>Date : </div>
                                        <div className={classes.labelContent}>
                                            {detail.end_date}
                                        </div>
                                    </div>
                                    <div className={classes.left}>
                                        <div className={classes.label}>Address : </div>
                                        <div className={classes.labelContent}>
                                            {detail.address}
                                        </div>
                                    </div>
                                    {detail.lat && detail.lng && detail.address &&
                                        <div style={{ width: '500px', height: '400px' }}>
                                            <Map
                                                google={this.props.google}
                                                initialCenter={{
                                                    lat: Number(detail.lat),
                                                    lng: Number(detail.lng)
                                                }}
                                                center={{
                                                    lat: Number(detail.lat),
                                                    lng: Number(detail.lng)
                                                }}
                                                containerStyle={{ width: '450px', height: '350px', borderRadius: '10px', marginLeft: '25px', marginTop: '25px' }}
                                                style={{ width: '450px', height: '350px', borderRadius: '10px' }}
                                                zoom={14}
                                                visible={true}
                                            >
                                                <Marker
                                                    title={'This is the party place'}
                                                    name={detail.title}
                                                    position={{ lat: Number(detail.lat), lng: Number(detail.lng) }}
                                                    onClick={this.onMarkerClick}
                                                />
                                                <InfoWindow
                                                    marker={this.state.activeMarker}
                                                    visible={this.state.showingInfoWindow}
                                                >
                                                    <div>
                                                        <h3>{this.state.selectedPlace.name}</h3>
                                                    </div>
                                                </InfoWindow>
                                            </Map>
                                        </div>
                                    }
                                    {
                                        detail.attend_cd === null?
                                        <div>
                                            <p>Will you attend?</p>
                                            <Button onClick={this.clickAnswer(1)} color="primary">Yes</Button>
                                            <Button onClick={this.clickAnswer(0)} color="secondary">No</Button>
                                            <Button onClick={this.clickAnswer(2)}>Maybe</Button>
                                        </div> :
                                        <div>
                                            <p>
                                                Will you attend?&nbsp;
                                                {detail.attend_cd === 0 ? 
                                                    <span className={classes.red}>No</span> : 
                                                    detail.attend_cd === 1 ? 
                                                        <span className={classes.blue}>Yes</span> : 
                                                        <span className={classes.grey}>Maybe</span>}
                                            </p>
                                        </div>
                                    }
                                </div>
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

export default GoogleApiWrapper({
    apiKey: API_KEY
})(connect(mapStateToProps)(withRouter(withStyles(styles)(GuestPage))));