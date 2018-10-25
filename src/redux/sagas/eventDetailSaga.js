import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';

function* eventDetail(action) {
    try {
        const id = action.payload;

        const detailResponse = yield call(axios.get, `/api/detail/${id}`);

        yield put({ type: 'GET_EVENT_DETAIL', payload: detailResponse.data[0] });
    } catch(error) {
        console.log('error getting event detail :', error);
    }
}

function* eventDetailSaga() {
    yield takeLatest('EVENT_DETAIL', eventDetail);
}

export default eventDetailSaga;