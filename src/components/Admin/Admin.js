import React, { Component } from 'react';
import { connect } from 'react-redux';

const year = ['2018', '2019'];
const month = [
    { name: 'Jan', value: '1'}, 
    { name: 'Feb', value: '2'}, 
    { name: 'Mar', value: '3'}, 
    { name: 'Apr', value: '4'}, 
    { name: 'May', value: '5'}, 
    { name: 'Jun', value: '6'}, 
    { name: 'Jul', value: '7'}, 
    { name: 'Aug', value: '8'}, 
    { name: 'Sep', value: '9'}, 
    { name: 'Oct', value: '10'}, 
    { name: 'Nov', value: '11'}, 
    { name: 'Dec', value: '12'}
];
const date = new Date();

class Admin extends Component {
    state = {
        year: date.getFullYear(),
        month: (date.getMonth()+1),
    }

    handleChangeForYear = event => {
        this.setState({ year: event.target.value });
        this.props.dispatch({ type: 'GET_USER_DATA_YEAR', payload: event.target.value });
    }

    handleChangeForMonth = property => event => {
        this.setState({ [property]: event.target.value });
        this.props.dispatch({ type: 'GET_USER_DATA_MONTH', payload: { ...this.state, [property]: event.target.value }});
    }

    componentDidMount = () => {
        this.props.dispatch({ type: 'GET_USER_COUNT' });
        this.props.dispatch({ type: 'GET_USER_DATA_YEAR', payload: date.getFullYear() });
        this.props.dispatch({ type: 'GET_USER_DATA_MONTH', payload: { year: date.getFullYear(), month: date.getMonth()+1 }});
    }

    render() {
        return (
            <div>
                <div>
                    <h1 style={{display: 'inline-block', margin: '10px 10px'}}>Admin Page</h1>
                    <div style={{float: 'right', fontSize: '30px', margin: '10px 10px'}}>Total Users : <strong>{this.props.userCount}</strong></div>
                </div>
                <div style={{textAlign: 'center'}}>
                    <div style={{width: '500px', height: '550px', display: 'inline-block'}}>
                        <h2>Registered Users(Month)</h2>
                        <div>
                            <select onChange={this.handleChangeForYear} value={this.state.year}>
                                {year.map(year => <option key={year} value={year}>{year}</option>)}
                            </select>
                        </div>
                        <canvas id="myChart1" width='500px' height='450px'></canvas>
                    </div>
                    <div style={{width: '500px', height: '550px', display: 'inline-block'}}>
                        <h2>Registered Users(Day)</h2>
                        <div>
                            <select onChange={this.handleChangeForMonth('year')} value={this.state.year}>
                                {year.map(year => <option key={year} value={year}>{year}</option>)}
                            </select>
                            <select onChange={this.handleChangeForMonth('month')} value={this.state.month}>
                                {month.map(month => <option key={month.value} value={month.value}>{month.name}</option>)}
                            </select>
                        </div>
                        <canvas id="myChart2" width='500px' height='450px'></canvas>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({userData, userCount}) => ({userData, userCount});

export default connect(mapStateToProps)(Admin);