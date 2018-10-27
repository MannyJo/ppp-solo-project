import React, { Component } from 'react';
import { connect } from 'react-redux';
import './CustomDialog.css';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class CustomDialog extends Component {
    handleClose = () => {
        this.props.dispatch({ type: 'CLOSE_DIALOG' });
    }

    render() {
        return (
            <Dialog
                open={this.props.dialogOpen}
                onClose={this.handleClose}
                scroll='paper'
            >
            <DialogTitle>Subscribe</DialogTitle>
            <DialogContent>
                Hello?
            </DialogContent>
            <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={this.handleClose} color="primary">
                    Update
                </Button>
            </DialogActions>
        </Dialog>
        );
    }
}

const mapStateToProps = ({ dialogOpen }) => ({ dialogOpen });

export default connect(mapStateToProps)(CustomDialog);