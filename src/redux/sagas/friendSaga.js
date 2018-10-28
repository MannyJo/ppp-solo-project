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
        yield put({ type: 'GET_FRIEND_LIST_BY_GROUP_ID', payload: { friendList: response.data, groupId: '0' } });
    } catch (error) {
        console.log('Friend list get request failed', error);
    }
}

function* addFriend(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        yield axios.post('/api/friend', action.payload, config);

        yield put({ type: 'FRIEND_LIST' });
    } catch (error) {
        console.log('Friend add request failed', error);
    }
}

function* deleteFriend(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        const id = action.payload.id;

        yield axios.delete(`/api/friend/${id}`, config);

        yield put({ type: 'FRIEND_LIST' });
    } catch (error) {
        console.log('Friend delete request failed', error);
    }
}

function* updateFriend(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        yield axios.put(`/api/friend/update`, action.payload, config);

        yield put({ type: 'FRIEND_LIST' });
    } catch (error) {
        console.log('Friend delete request failed', error);
    }
}

function* friendSaga() {
    yield takeLatest('FRIEND_LIST', friendList);
    yield takeLatest('ADD_FRIEND', addFriend);
    yield takeLatest('DELETE_FRIEND', deleteFriend);
    yield takeLatest('UPDATE_FRIEND', updateFriend);
}

export default friendSaga;