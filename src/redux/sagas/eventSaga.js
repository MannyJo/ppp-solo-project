import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
};

function* eventList() {
    try {
        const response = yield axios.get('/api/event', config);

        yield put({ type: 'GET_EVENT_LIST', payload: response.data });
    } catch (error) {
        console.log('Event list get request failed', error);
    }
}

function* eventListByKeyword(action) {
    try {
        const year = action.payload.year==='' || action.payload.year===undefined ? '0' : action.payload.year;
        const month = action.payload.month==='' || action.payload.month===undefined ? '0' : action.payload.month;
        const keyword = action.payload.searchWord===''?'nokeyword':encodeURIComponent(action.payload.searchWord);

        const response = yield axios.get(`/api/event/${year}/${month}/${keyword}`, config);

        yield put({ type: 'GET_EVENT_LIST', payload: response.data });
    } catch (error) {
        console.log('Event list get request failed', error);
    }
}

function* deleteEvent(action) {
    try {
        yield axios.delete(`/api/event/${action.payload}`, config);

        yield put({ type: 'EVENT_LIST' });
    } catch (error) {
        console.log('Event delete request failed', error);
    }
}

function* eventSaga() {
    yield takeLatest('EVENT_LIST', eventList);
    yield takeLatest('EVENT_LIST_BY_KEYWORD', eventListByKeyword);
    yield takeLatest('DELETE_EVENT', deleteEvent);
}

export default eventSaga;