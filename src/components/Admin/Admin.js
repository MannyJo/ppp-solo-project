import React, { Component } from 'react';
import Chart from 'chart.js';

const year = ['2018', '2019'];
const month = ['Jan', 'Feb', 'Mar', 'Apr', 'Man', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

class Admin extends Component {

    componentDidMount = () => {
        let ctx = document.getElementById('myChart');
        let myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1,
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
    }

    render() {
        return (
            <div>
                <div>
                    <h1 style={{display: 'inline-block'}}>Admin Page</h1>
                    <div style={{float: 'right', fontSize: '30px', margin: '10px 10px 0 0'}}>Total Users : 100</div>
                </div>
                <canvas id="myChart" width="100%" height="50%"></canvas>
            </div>
        );
    }
}

export default Admin;