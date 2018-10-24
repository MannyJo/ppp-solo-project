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

    handleSubmit = event => {
        event.preventDefault();
        // console.log('submit');
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
                                <td><button>Delete</button></td>
                            </tr>    
                        )}
                    </tbody>
                </table>
                <pre>
                    {JSON.stringify(this.state, null, 2)}
                    {JSON.stringify(this.props.groupList, null, 2)}
                </pre>
            </div>
        );
    }
}

const mapStateToProps = ({ groupList }) => ({ groupList });

export default connect(mapStateToProps)(GroupPage);