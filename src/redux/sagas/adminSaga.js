import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import Chart from 'chart.js';

let bgColors = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(0,0,0, 0.2)',
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)'
];
let bdColors = [
    'rgba(255,99,132,1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(0,0,0, 1)',
    'rgba(255,99,132,1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
];

let chart1;
let chart2;

function* getUserCount() {
    try {
        const response = yield call(axios.get, '/api/admin/');
        yield put({ type: 'USER_COUNT', payload: response.data[0].count });
    } catch (error) {
        console.log('Error getting total user count :', error);
    }
}

function* getUserDataYear(action) {
    try {
        const year = action.payload;
        const response = yield call(axios.get, `/api/admin/${year}`);
        const userData = response.data ;

        // this makes the chart not to show previous data
        if(chart1) {
            chart1.destroy();
        }

        chart1 = new Chart(document.getElementById('myChart1'), {
            type: 'bar',
            data: {
                labels: userData.map(data => data.month),
                datasets: [{
                    label: 'Registered Users',
                    data: userData.map(data => data.count),
                    backgroundColor: bgColors,
                    borderColor: bdColors,
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
    } catch(error) {
        console.log('Error getting user data');
    }
}

function* getUserDataMonth(action) {
    try {
        const year = action.payload.year;
        const month = action.payload.month;
        const response = yield call(axios.get, `/api/admin/${year}/${month}`);
        const userData = response.data ;

        if(chart2) {
            chart2.destroy();
        }

        chart2 = new Chart(document.getElementById('myChart2'), {
            type: 'bar',
            data: {
                labels: userData.map(data => data.day),
                datasets: [{
                    label: 'Registered Users',
                    data: userData.map(data => data.count),
                    backgroundColor: bgColors,
                    borderColor: bdColors,
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
    } catch(error) {
        console.log('Error getting user data');
    }
}

function* adminSaga() {
    yield takeLatest('GET_USER_COUNT', getUserCount);
    yield takeLatest('GET_USER_DATA_YEAR', getUserDataYear);
    yield takeLatest('GET_USER_DATA_MONTH', getUserDataMonth);
}

export default adminSaga;