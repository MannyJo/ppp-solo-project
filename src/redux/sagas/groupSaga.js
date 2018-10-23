import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* groupList() {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        const response = yield axios.get('/api/group', config);
        console.log(response.data);
        yield put({ type: 'GET_GROUP_LIST', payload: response.data });
    } catch (error) {
        console.log('Group list get request failed', error);
    }
}

function* groupSaga() {
    yield takeLatest('GROUP_LIST', groupList);
}

export default groupSaga;