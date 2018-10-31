import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import styles from './InvitationFormStyles';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import Send from '@material-ui/icons/Send';

const API_KEY = 'AIzaSyA8ALSMNJnujiOFPjfzNmT8CzBEVdqIsj4';
let markers = [];

class InvitationForm extends Component {
    state = {
        title: '',
        message: '',
        secretMessage: '',
        endDate: '',
        location: '',
        lat: '',
        lng: '',
        selectedFriends: [],
        showingInfoWindow: true,
        activeMarker: {},
        selectedPlace: {},
    }

    handleAddClick = event => {
        event.preventDefault();

        let friendId = document.getElementById('friendList').value;

        const selectedFriend = this.props.friendListByGroupId.map(friend => {
            return { ...friend, checked: false };
        }).filter(friend => {
            let count = 0; // counter to check the same id is in the table
            this.state.selectedFriends.forEach(addedFriend => {
                if (friend.id === addedFriend.id) {
                    count++;
                }
            });

            // if there is already the same friend in the table, return nothing
            if (count > 0) {
                return false;
            }

            // 0: all
            if (friendId === '0') {
                return true;
            } else if (Number(friendId) === friend.id) {
                return true;
            }
            return false;
        });

        this.setState({ selectedFriends: [...this.state.selectedFriends, ...selectedFriend] });
    }

    handleDeleteClick = id => event => {
        event.preventDefault();
        const selectedFriends = this.state.selectedFriends.filter(friend => (friend.id !== id));

        this.setState({ selectedFriends: [...selectedFriends] });
    }

    // whenever group changes, the friend list changes properly as well
    handleGroupChange = event => {
        this.props.dispatch({
            type: 'GET_FRIEND_LIST_BY_GROUP_ID',
            payload: { friendList: this.props.friendList, groupId: event.target.value }
        });
    }

    handleCheckedClick = id => event => {
        const selectedFriends = this.state.selectedFriends.map(friend => {
            if (friend.id === id) {
                return { ...friend, checked: event.target.checked, };
            }
            return friend;
        });

        this.setState({ selectedFriends: [...selectedFriends,] });
    }

    // change state data by property name when the input data changes
    handleChangeFor = property => event => {
        this.setState({ [property]: event.target.value });
    }

    loadImageFile = () => {
        let ImgReader = new FileReader();

        ImgReader.onload = (Event) => {
            let newPreview = document.getElementById("imagePreview");
            let ImagePre = new Image();
            
            if(newPreview.hasChildNodes()){
                newPreview.removeChild(newPreview.firstChild);
            }

            ImagePre.style.width = "500px";
            newPreview.appendChild(ImagePre);
            ImagePre.src = Event.target.result;
        };

        let img = document.getElementById("image").files;
        ImgReader.readAsDataURL(img[0]);
    }

    initAutocomplete = (mapProps, map) => {
        let { google } = mapProps;

        // Create the search box and link it to the UI element.
        let input = document.getElementById('location');
        let searchBox = new google.maps.places.SearchBox(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function () {
            searchBox.setBounds(map.getBounds());
        });

        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', () => {
            let places = searchBox.getPlaces();

            if (places.length === 0) {
                return;
            }

            // Clear out the old markers.
            markers.forEach(function (marker) {
                marker.setMap(null);
            });
            markers = [];

            // For each place, get the icon, name and location.
            let bounds = new google.maps.LatLngBounds();

            // only need one place!!!
            // places.forEach(function (place) {
                let place = places[0];
                if (!place.geometry) {
                    console.log("Returned place contains no geometry");
                    return;
                }

                // Create a marker for each place.
                markers.push(new google.maps.Marker({
                    map: map,
                    title: place.name,
                    position: place.geometry.location
                }));

                this.setState({
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                    location: place.formatted_address,
                });

                if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            // });
            map.fitBounds(bounds);
        });
    }

    onMapClicked = (mapProps, map, clickEvent) => {

        let { google } = mapProps;
        let geocoder = new google.maps.Geocoder();
        let address = '';

        let latLng = { 
            lat: clickEvent.latLng.lat(), 
            lng: clickEvent.latLng.lng() 
        };

        markers.forEach((marker) => {
            marker.setMap(null);
        });
        markers = [];

        markers.push(new google.maps.Marker({
            map: map,
            title: 'something',
            name: 'my marker',
            position: latLng
        }));

        geocoder.geocode({ location: latLng }, (results, status) => {
            address = results[0].formatted_address;
            document.getElementById('location').value = results[0].formatted_address;

            this.setState({
                lat: latLng.lat,
                lng: latLng.lng,
                location: address,
            });

            map.setCenter(latLng);
        });
    };

    preventEnter = event => {
        if(event.key === 'Enter') {
            event.preventDefault();
        }
    }

    sendToMain = event => {
        event.preventDefault();
        this.props.history.goBack();
    }

    handleSubmitClick = event => {
        event.preventDefault();

        if (this.state.selectedFriends.length === 0) {
            alert('You should select at least one friend');
        } else {
            let imageFile = new FormData();
            imageFile.append('file', this.uploadInput.files[0]);

            this.props.dispatch({ type: 'MAKE_NEW_INVITATION', payload: { imageFile: imageFile, form: this.state } });
            this.props.history.push('/main');
        }
    }

    // get group and friend lists from redux and saga
    componentDidMount = () => {
        this.props.dispatch({ type: 'GROUP_LIST' });
        this.props.dispatch({ type: 'FRIEND_LIST' });
    }

    render() {
        const classes = this.props.classes;
        return (
            <div>
                <h2>Make an Invitation</h2>
                <form onSubmit={this.handleSubmitClick} className={classes.newFrame}>
                    <div className={classes.newForm}>
                        <label htmlFor="title">Title*</label>
                        <input
                            id="title" name="title" type="text"
                            value={this.state.title}
                            onChange={this.handleChangeFor('title')}
                            className={classes.input}
                            autoFocus
                            required
                        />
                        <label htmlFor="image">Image</label>
                        <input id="image" name="image" type="file" multiple={false}
                            ref={(ref) => { this.uploadInput = ref; }}
                            accept="image/*"
                            onChange={this.loadImageFile}
                            className={classes.input}
                        />
                        <div id="imagePreview"></div>
                        <label htmlFor="message">Message*</label>
                        <input id="message" name="message" type="text"
                            value={this.state.message}
                            onChange={this.handleChangeFor('message')}
                            className={classes.input}
                            required
                        />
                        <label htmlFor="secretMsg">Secret Message</label>
                        <input id="secretMsg" name="secretMsg" type="text"
                            value={this.state.secretMessage}
                            onChange={this.handleChangeFor('secretMessage')}
                            className={classes.secret}
                        />
                        <label htmlFor="date">Date* : </label>
                        <TextField
                            id="date"
                            name="date"
                            type="date"
                            value={this.state.endDate}
                            className={classes.textField}
                            onChange={this.handleChangeFor('endDate')}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                        /><br /><br />
                        <label htmlFor="location">Location</label>
                        <input id="location" name="location" type="text"
                            value={this.state.location}
                            onChange={this.handleChangeFor('location')}
                            className={classes.input}
                            onKeyPress={this.preventEnter}
                        />
                        <div style={{ width: '500px', height: '400px' }}>
                            <Map
                                google={this.props.google}
                                onReady={this.initAutocomplete}
                                onClick={this.onMapClicked}
                                initialCenter={{
                                    lat: 44.97804657489641,
                                    lng: -93.26346470396726
                                }}
                                containerStyle={{ width: '500px', height: '400px', borderRadius: '10px' }}
                                style={{ width: '500px', height: '400px', borderRadius: '10px' }}
                                zoom={14}
                                visible={true}
                            >
                            </Map>
                        </div><br />
                        <label htmlFor="friendList">Friends : </label>
                        <select id="groupList" name="groupList"
                            onChange={this.handleGroupChange}
                            className={classes.select}
                        >
                            <option value="0">All Groups</option>
                            {this.props.groupList.map(group =>
                                <option key={group.id} value={group.id}>{group.group_name}</option>
                            )}
                        </select>&nbsp;
                        <select id="friendList" name="friendList"
                            className={classes.select}
                        >
                            <option value="0">All</option>
                            {this.props.friendListByGroupId.map(friend =>
                                <option key={friend.id} value={friend.id}>{friend.friend_name}</option>
                            )}
                        </select>&nbsp;
                        <Button variant="outlined" color="primary" onClick={this.handleAddClick}>Add Friend</Button><br /><br />
                        <div className={this.state.selectedFriends.length > 0 ? null : classes.noDisplay}>
                            <label htmlFor="selectedFriendList">Invited Friends</label>
                            <Table id="selectedFriendList">
                                <TableHead>
                                    <TableRow>
                                        <TableCell className={classes.center}>Secret<br />Message</TableCell>
                                        <TableCell className={classes.center}>Name</TableCell>
                                        <TableCell className={classes.center}>Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.selectedFriends.map(friend =>
                                        <TableRow key={friend.id}>
                                            <TableCell className={classes.center}><input type="checkbox" value={friend.checked} onClick={this.handleCheckedClick(friend.id)} /></TableCell>
                                            <TableCell className={classes.friendName}>{friend.friend_name}</TableCell>
                                            <TableCell className={classes.center}><button onClick={this.handleDeleteClick(friend.id)}>Delete</button></TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                    <div className={classes.bottomLine}>
                        <Button
                            onClick={this.sendToMain}
                            variant="contained"
                            color="secondary"
                            className={classes.bottomButton}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={classes.bottomButton}
                        >
                            <Send />&nbsp;Send
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    groupList: state.groupList,
    friendList: state.friendList.friendList,
    friendListByGroupId: state.friendList.friendListByGroupId,
});

export default GoogleApiWrapper({
    apiKey: API_KEY
})(connect(mapStateToProps)(withRouter(withStyles(styles)(InvitationForm))));