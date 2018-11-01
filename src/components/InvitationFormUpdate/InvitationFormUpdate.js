import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
import swal from 'sweetalert2';

const API_KEY = 'AIzaSyA8ALSMNJnujiOFPjfzNmT8CzBEVdqIsj4';
let markers = [];

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const styles = theme => ({
    form: {
        textAlign: 'left',
        marginBottom: '10px',
    },
    input: {
        width: '100%',
        padding: '12px 20px',
        margin: '8px 0',
        display: 'inline-block',
        border: '1px solid #ccc',
        boxSizing: 'border-box',
        borderRadius: '5px',
    },
    secret: {
        width: '100%',
        padding: '12px 20px',
        margin: '8px 0',
        display: 'inline-block',
        border: '1px solid #ccc',
        boxSizing: 'border-box',
        color: 'blue',
        borderRadius: '5px',
    },
});

class InvitationFormUpdate extends Component {
    state = {
        title: '',
        message: '',
        secretMessage: '',
        endDate: '',
        location: '',
        img_url: '',
        lat: '',
        lng: '',
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        selectedFriends: [],
    }

    handleChangeFor = property => event => {
        this.setState({ [property]: event.target.value });
    }

    handleClose = () => {
        this.props.dispatch({ type: 'CLOSE_DIALOG' });
    }

    handleCheckedClick = id => event => {
        const selectedFriends = this.state.selectedFriends.map(friend => {
            if (friend.id === id) {
                return { ...friend, show_secret: event.target.checked, };
            }
            return friend;
        });

        this.setState({ selectedFriends: [...selectedFriends,] });
    }

    handleDeleteClick = id => event => {
        event.preventDefault();
        const selectedFriends = this.state.selectedFriends.filter(friend => (friend.id !== id));

        this.setState({ selectedFriends: [...selectedFriends] });
    }

    handleAddClick = event => {
        event.preventDefault();

        let friendId = document.getElementById('friendList').value;
        const selectedFriend = this.props.friendListByGroupId.map(friend => {
            return { ...friend, show_secret: false, attend_cd: null };
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

    loadImageFile = () => {
        let ImgReader = new FileReader();

        ImgReader.onload = (Event) => {
            let newPreview = document.getElementById("imagePreview");
            let ImagePre = new Image();

            if (newPreview.hasChildNodes()) {
                newPreview.removeChild(newPreview.firstChild);
            }

            ImagePre.style.width = "100%";
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
            let place = places[0];
            if (!place.geometry) {
                swal(
                    'Failed!?',
                    'Returned place contains no geometry.',
                    'error'
                );
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
            title: 'Party Place',
            name: 'Party Place',
            position: latLng
        }));

        geocoder.geocode({ location: latLng }, (results, status) => {
            address = results[0].formatted_address;
            document.getElementById('location').value = results[0].formatted_address;

            this.setState({ lat: latLng.lat, lng: latLng.lng, location: address });

            map.setCenter(latLng);
        });
    };

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }

    handleSubmitClick = event => {
        event.preventDefault();

        let imageFile = new FormData();
        imageFile.append('file', this.uploadInput.files[0]);

        this.props.dispatch({ type: 'UPDATE_DETAIL', payload: { ...this.state, imageFile: imageFile } });
        this.props.dispatch({ type: 'CLOSE_DIALOG' });
    }

    componentDidMount = () => {
        this.props.dispatch({ type: 'GROUP_LIST' });
        this.props.dispatch({ type: 'FRIEND_LIST' });
        let dateArr = this.props.detail.end_date.split('/');
        this.setState({
            id: this.props.detail.id,
            title: this.props.detail.title,
            message: this.props.detail.message,
            secretMessage: this.props.detail.secret_message,
            endDate: dateArr[2] + '-' + dateArr[0] + '-' + dateArr[1],
            location: this.props.detail.address,
            lat: this.props.detail.lat,
            lng: this.props.detail.lng,
            img_url: this.props.detail.img_url,
            selectedFriends: this.props.members,
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <Dialog
                open={this.props.dialogOpen}
                onClose={this.handleClose}
                scroll='paper'
            >
                <form onSubmit={this.handleSubmitClick} className={classes.newFrame}>
                    <DialogContent>
                        <label htmlFor="title">Title</label>
                        <input
                            id="title" name="title" type="text"
                            value={this.state.title}
                            onChange={this.handleChangeFor('title')}
                            className={classes.input}
                        />
                        <label htmlFor="image">Image</label>
                        <input id="image" name="image" type="file" multiple={false}
                            ref={(ref) => { this.uploadInput = ref; }}
                            accept="image/*"
                            onChange={this.loadImageFile}
                            className={classes.input}
                        />
                        <div id="imagePreview">
                            <img src={this.state.img_url} width="100%" alt="Just Added" />
                        </div>
                        <label htmlFor="message">Message</label>
                        <input id="message" name="message" type="text"
                            value={this.state.message}
                            onChange={this.handleChangeFor('message')}
                            className={classes.input}
                        />
                        <label htmlFor="secretMsg">Secret Message</label>
                        <input id="secretMsg" name="secretMsg" type="text"
                            value={this.state.secretMessage}
                            onChange={this.handleChangeFor('secretMessage')}
                            className={classes.secret}
                        />
                        <label htmlFor="date">Date : </label>
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
                        />
                        <div style={{ width: '535px', height: '400px' }}>
                            <Map
                                google={this.props.google}
                                onReady={this.initAutocomplete}
                                onClick={this.onMapClicked}
                                initialCenter={{
                                    lat: Number(this.state.lat),
                                    lng: Number(this.state.lng)
                                }}
                                center={{
                                    lat: Number(this.state.lat),
                                    lng: Number(this.state.lng)
                                }}
                                containerStyle={{ width: '535px', height: '400px', borderRadius: '10px' }}
                                style={{ width: '535px', height: '400px', borderRadius: '10px' }}
                                zoom={14}
                                visible={true}
                            >
                                <Marker
                                    title={'This is the party place'}
                                    name={this.state.title}
                                    position={{ lat: Number(this.state.lat), lng: Number(this.state.lng) }}
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
                                            <TableCell className={classes.center}><input type="checkbox" value={friend.show_secret} defaultChecked={friend.show_secret} onClick={this.handleCheckedClick(friend.id)} /></TableCell>
                                            <TableCell className={classes.friendName}>{friend.friend_name}</TableCell>
                                            <TableCell className={classes.center}><button onClick={this.handleDeleteClick(friend.id)}>Delete</button></TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button color="primary" type="submit">
                            Update
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        );
    }
}

const mapStateToProps = state => ({
    groupList: state.groupList,
    friendListByGroupId: state.friendList.friendListByGroupId,
    detail: state.eventDetail.detail,
    members: state.eventDetail.members,
    dialogOpen: state.dialogOpen,
});

export default GoogleApiWrapper({
    apiKey: API_KEY
})(connect(mapStateToProps)(withStyles(styles)(InvitationFormUpdate)));