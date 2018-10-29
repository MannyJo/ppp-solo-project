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

class EventDetail extends Component {

    handleBackClick = () => {
        this.props.history.goBack();
    }

    handleUpdateClick = () => {
        this.props.dispatch({ type: 'OPEN_DIALOG' });
    }

    componentDidMount = () => {
        const id = window.location.hash.split('/').pop();
        this.props.dispatch({ type: 'EVENT_DETAIL', payload: id });
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
                        <div><img src={detail.img_url} className={classes.image} /></div>
                        <div className={classes.message}>{detail.message}</div>
                        <div className={classes.secretMessage}>{detail.secret_message}</div>
                        <div className={classes.left}><div className={classes.label}>Date : </div> {detail.end_date}</div>
                        <div className={classes.left}><div className={classes.label}>Address : </div> {detail.address}</div>
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
                {this.props.dialogOpen?<InvitationFormUpdate />:null}
            </div>
        );
    }
}

const mapStateToProps = ({ eventDetail, dialogOpen }) => ({
    detail: eventDetail.detail,
    members: eventDetail.members,
    dialogOpen,
});

export default connect(mapStateToProps)(withRouter(withStyles(styles)(EventDetail)));