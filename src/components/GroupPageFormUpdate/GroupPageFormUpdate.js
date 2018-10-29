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
});

class GroupPageFormUpdate extends Component {
    state = {
        groupId: 0,
        groupName: '',
    }

    handleChangeFor = property => event => {
        this.setState({
            [property]: event.target.value,
        });
    }

    handleClose = () => {
        this.props.dispatch({ type: 'CLOSE_DIALOG' });
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.dispatch({ type: 'UPDATE_GROUP', payload: this.state });
        this.handleClose();
    }

    componentDidMount = () => {
        this.setState({
            groupId: this.props.group.id,
            groupName: this.props.group.group_name,
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
                        <label htmlFor="groupInput">Group : </label>
                        <input
                            type="text"
                            value={this.state.groupName}
                            placeholder="Group Name"
                            onChange={this.handleChangeFor('groupName')}
                            className={classes.input}
                        />
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
    dialogOpen: state.dialogOpen,
});

export default connect(mapStateToProps)(withStyles(styles)(GroupPageFormUpdate));