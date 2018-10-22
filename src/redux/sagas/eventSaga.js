import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* eventList() {
    try {
        const config = {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        };

        const response = yield axios.get('/api/event', config);
        
        yield put({ type: 'GET_EVENT_LIST', payload: response.data });
    } catch(error) {
        console.log('Event list get request failed', error);
    }
}

function* deleteEvent(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        console.log(action.payload);
        yield axios.delete(`/api/event/${action.payload}`, config);
        
        yield put({ type: 'EVENT_LIST' });
    } catch(error) {
        console.log('Event delete request failed', error);
    }
}

function* eventSaga() {
    yield takeLatest('EVENT_LIST', eventList);
    yield takeLatest('DELETE_EVENT', deleteEvent);
}

export default eventSaga;