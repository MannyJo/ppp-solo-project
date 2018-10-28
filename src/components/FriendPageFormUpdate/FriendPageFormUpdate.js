import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

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
    select: {
        width: '140px',
        height: '35px',
    },
});

class FriendPageForm extends Component {
    state = {
        id: '',
        friendName: '',
        friendEmail: '',
        groupId: 0,
    }

    handleChangeFor = property => event => {
        this.setState({
            [property]: event.target.value,
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.dispatch({ type: 'UPDATE_FRIEND', payload: this.state });
        this.handleClose();
    }

    handleClose = () => {
        this.props.dispatch({ type: 'CLOSE_DIALOG' });
    }

    componentDidMount = () => {
        this.props.dispatch({ type: 'GROUP_LIST' });
        this.setState({
            id: this.props.friendInfo.id,
            friendName: this.props.friendInfo.friend_name,
            friendEmail: this.props.friendInfo.friend_email,
            groupId: this.props.friendInfo.group_id,
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
                <form onSubmit={this.handleSubmit} className={classes.form}>
                    <DialogContent>
                        <label htmlFor="friendInput">Friend : </label>
                        <input
                            type="text"
                            id="friendInput"
                            value={this.state.friendName}
                            placeholder="Friend's Name"
                            onChange={this.handleChangeFor('friendName')}
                            className={classes.input}
                            required
                        />
                        <label htmlFor="emailInput">E-Mail : </label>
                        <input
                            type="email"
                            id="emailInput"
                            value={this.state.friendEmail}
                            placeholder="Friend's E-Mail"
                            onChange={this.handleChangeFor('friendEmail')}
                            className={classes.input}
                            required
                        />
                        <label htmlFor="groupList">Group : </label>
                        <select
                            id="groupList"
                            name="groupList"
                            onChange={this.handleChangeFor('groupId')}
                            defaultValue={this.state.groupId}
                            className={classes.select}
                            required
                        >
                            <option value="">select</option>
                            {this.props.groupList.map(group =>
                                <option key={group.id} value={group.id}>{group.group_name}</option>
                            )}
                        </select>
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
    friendInfo: state.friendList.friendInfo,
    dialogOpen: state.dialogOpen,
});

export default connect(mapStateToProps)(withStyles(styles)(FriendPageForm));