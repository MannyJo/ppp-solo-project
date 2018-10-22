import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* eventList() {
    try {
        const config = {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        };

        const response = yield axios.get('/api/eventlist', config);
        
        yield put({ type: 'GET_EVENT_LIST', payload: response.data });
    } catch(error) {
        console.log('Event list get request failed', error);
    }
}

function* mainSaga() {
    yield takeLatest('EVENT_LIST', eventList);
}

export default mainSaga;