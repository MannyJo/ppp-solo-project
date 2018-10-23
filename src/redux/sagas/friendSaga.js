import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* friendList() {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        const response = yield axios.get('/api/friend', config);

        yield put({ type: 'GET_FRIEND_LIST', payload: response.data });
        yield put({ type: 'GET_FRIEND_LIST_BY_GROUP_ID', payload: { friendList: response.data, groupId: '0' }});
    } catch (error) {
        console.log('Friend list get request failed', error);
    }
}

function* friendSaga() {
    yield takeLatest('FRIEND_LIST', friendList);
}

export default friendSaga;