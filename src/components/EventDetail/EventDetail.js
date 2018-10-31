import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import FacesIcon from '@material-ui/icons/Face';
import Button from '@material-ui/core/Button'
import styles from './EventDetailStyles';
import InvitationFormUpdate from '../InvitationFormUpdate/InvitationFormUpdate';
import { Map, InfoWindow, GoogleApiWrapper, Marker } from 'google-maps-react';

const API_KEY = 'AIzaSyA8ALSMNJnujiOFPjfzNmT8CzBEVdqIsj4';

class EventDetail extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
    }

    handleBackClick = () => {
        this.props.history.goBack();
    }

    handleUpdateClick = () => {
        this.props.dispatch({ type: 'OPEN_DIALOG' });
    }

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }

    componentDidMount = () => {
        const id = window.location.hash.split('/').pop();
        this.props.dispatch({ type: 'EVENT_DETAIL', payload: id });
        console.log(this.props.members);
    }

    render() {
        const detail = this.props.detail;
        const members = this.props.members;
        const classes = this.props.classes;
        return (
            <div>
                <h2>Event Detail Page</h2>
                <div className={classes.displayFlex}>
                    <div className={classes.detailFrame}>
                        <div className={classes.title}><strong>{detail.title}</strong></div>
                        <div><img src={detail.img_url} className={classes.image} alt={detail.title} /></div>
                        <div className={classes.message}>{detail.message}</div>
                        <div className={classes.secretMessage}>{detail.secret_message}</div>
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
                                    center={{
                                        lat: Number(detail.lat),
                                        lng: Number(detail.lng)
                                    }}
                                    containerStyle={{ width: '450px', height: '350px', borderRadius: '10px' , marginLeft: '25px', marginTop: '25px' }}
                                    style={{ width: '450px', height: '350px', borderRadius: '10px' }}
                                    zoom={14}
                                    visible={true}
                                >
                                    <Marker
                                        title={'This is the party place'}
                                        name={detail.title}
                                        position={{ lat: detail.lat, lng: detail.lng }}
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
                        <br />
                        <div>
                            <div className={classes.left}>
                                <div className={classes.label}>
                                    Members :
                                </div>
                                &nbsp;&nbsp;
                                <div className={classes.caption}>
                                    <span className={classes.grey}>* No answers/Maybe</span>&nbsp;&nbsp;
                                    <span className={classes.red}>* Don't go</span>&nbsp;&nbsp;
                                    <span className={classes.blue}>* Attend</span>
                                </div>
                            </div>
                            {members.map(member =>
                                <Chip
                                    key={member.id}
                                    icon={member.attend_cd === 1 ? <TagFacesIcon /> : <FacesIcon />}
                                    label={member.friend_name}
                                    className={classes.chip}
                                    color={member.attend_cd === 0 ? 'secondary' : member.attend_cd === 1 ? 'primary' : 'default'}
                                />
                            )}
                        </div>
                        <div className={classes.button}>
                            <Button variant="outlined" color="primary" onClick={this.handleBackClick}>Back</Button>&nbsp;
                            <Button variant="outlined" color="secondary" onClick={this.handleUpdateClick}>Update</Button>
                        </div>
                    </div>
                </div>
                {this.props.dialogOpen ? <InvitationFormUpdate /> : null}
            </div>
        );
    }
}

const mapStateToProps = ({ eventDetail, dialogOpen }) => ({
    detail: eventDetail.detail,
    members: eventDetail.members,
    dialogOpen,
});

export default GoogleApiWrapper({
    apiKey: API_KEY
})(connect(mapStateToProps)(withRouter(withStyles(styles)(EventDetail))));