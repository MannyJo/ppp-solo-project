import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';

function* eventDetail(action) {
    try {
        const id = action.payload;

        const detailResponse = yield call(axios.get, `/api/detail/${id}`);

        yield put({ type: 'GET_EVENT_DETAIL', payload: detailResponse.data.detail });
        yield put({ type: 'GET_EVENT_MEMBERS', payload: detailResponse.data.members });
    } catch(error) {
        console.log('error getting event detail :', error);
    }
}

function* updateDetail(action) {
    try {
        yield call(axios.put, '/api/detail/update', action.payload);
        yield put({ type: 'EVENT_DETAIL', payload: action.payload.id });
    } catch(error) {
        console.log('error updating event detail :', error);
    }
}

function* eventDetailSaga() {
    yield takeLatest('EVENT_DETAIL', eventDetail);
    yield takeLatest('UPDATE_DETAIL', updateDetail);
}

export default eventDetailSaga;