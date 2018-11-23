import React, { Component } from 'react';
import { connect } from 'react-redux';
import './CustomDialog.css';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

class CustomDialog extends Component {
    handleClose = () => {
        // Set dialog's open data false
        this.props.dispatch({ type: 'CLOSE_DIALOG' });
    }

    render() {
        const ComponentToProtect = this.props.dialogContent;
        return (
            <Dialog
                open={this.props.dialogOpen}
                onClose={this.handleClose}
                scroll='paper'
            >
                <DialogContent>
                    <ComponentToProtect />
                </DialogContent>
            </Dialog>
        );
    }
}

const mapStateToProps = ({ dialogInfo }) => ({
    dialogOpen: dialogInfo.dialogOpen,
    dialogContent: dialogInfo.dialogContent,
});

export default connect(mapStateToProps)(CustomDialog);