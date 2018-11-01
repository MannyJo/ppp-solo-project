import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    form: {
        textAlign: 'center',
        marginBottom: '10px',
    },
    input: {
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
        friendName: '',
        friendEmail: '',
        groupId: '',
    }

    handleChangeFor = property => event => {
        this.setState({
            [property]: event.target.value,
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        if(this.state.groupId === '' || this.state.groupId === null){
            swal(
                'Select Group',
                'One group has to be selected.',
                'warning'
            );
        } else {
            this.props.dispatch({ type: 'ADD_FRIEND', payload: this.state });
            this.setState({ friendName: '', friendEmail: '', groupId: '' });
        }
    }

    componentDidMount = () => {
        this.props.dispatch({ type: 'GROUP_LIST' });
    }

    render() {
        const { classes } = this.props;
        return (
            <form onSubmit={this.handleSubmit} className={classes.form}>
                <label htmlFor="friendInput">Friend : </label>
                <input 
                    type="text" 
                    id="friendInput" 
                    value={this.state.friendName} 
                    placeholder="Friend's Name"
                    onChange={this.handleChangeFor('friendName')} 
                    className={classes.input}
                    required 
                />&nbsp;&nbsp;
                <label htmlFor="emailInput">E-Mail : </label>
                <input 
                    type="email" 
                    id="emailInput" 
                    value={this.state.friendEmail} 
                    placeholder="Friend's E-Mail"
                    onChange={this.handleChangeFor('friendEmail')} 
                    className={classes.input}
                    required 
                />&nbsp;&nbsp;
                <label htmlFor="groupList">Group : </label>
                <select 
                    id="groupList" 
                    name="groupList" 
                    onChange={this.handleChangeFor('groupId')} 
                    className={classes.select}
                    required
                >
                    <option value="">select</option>
                    {this.props.groupList.map(group =>
                        <option key={group.id} value={group.id}>{group.group_name}</option>
                    )}
                </select>&nbsp;
                <Button variant="outlined" color="primary" type="submit">Add Group</Button>
            </form>
        );
    }
}

const mapStateToProps = state => ({ 
    groupList: state.groupList,
});

export default connect(mapStateToProps)(withStyles(styles)(FriendPageForm));