import React, { Component } from 'react';
import { connect } from 'react-redux';

class GroupPage extends Component {
    state = {
        newGroupName: '',
    }

    handleChangeFor = property => event => {
        this.setState({
            [property]: event.target.value,
        });
    }

    handleDeleteClick = group => () => {
        if(group.members > 0) {
            alert('Can remove this group because of the members');
        } else if(window.confirm('Want to delete?')) {
            this.props.dispatch({ type: 'DELETE_GROUP', payload: group });
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.dispatch({ type: 'ADD_GROUP', payload: this.state });
        this.setState({ newGroupName: '' });
    }

    componentDidMount = () => {
        this.props.dispatch({ type: 'GROUP_LIST' });
    }

    render() {
        return (
            <div>
                <h2>Groups</h2>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="groupInput">Group : </label>
                    <input type="text" value={this.state.newGroupName} onChange={this.handleChangeFor('newGroupName')} />
                    <button type="submit">Add Group</button>
                </form>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th># of Members</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.groupList.map(group => 
                            <tr key={group.id}>
                                <td>{group.group_name}</td>
                                <td>{group.members}</td>
                                <td><button>Update</button></td>
                                <td><button onClick={this.handleDeleteClick(group)}>Delete</button></td>
                            </tr>    
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = ({ groupList }) => ({ groupList });

export default connect(mapStateToProps)(GroupPage);