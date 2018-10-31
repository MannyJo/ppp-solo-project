import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
};

function* groupList() {
    try {
        const response = yield axios.get('/api/group', config);

        yield put({ type: 'GET_GROUP_LIST', payload: response.data });
    } catch (error) {
        console.log('Group list get request failed', error);
    }
}

function* groupListByKeyword(action) {
    try {
        const keyword = action.payload;
        const response = yield axios.get(`/api/group/${keyword}`, config);

        yield put({ type: 'GET_GROUP_LIST', payload: response.data });
    } catch (error) {
        console.log('Group list get request failed', error);
    }
}

function* addGroup(action) {
    try {
        yield axios.post('/api/group', action.payload, config);

        yield put({ type: 'GROUP_LIST' });
    } catch (error) {
        console.log('Group add request failed', error);
    }
}

function* deleteGroup(action) {
    try {
        const id = action.payload.id;

        yield axios.delete(`/api/group/${id}`, config);

        yield put({ type: 'GROUP_LIST' });
    } catch (error) {
        console.log('Group delete request failed', error);
    }
}

function* updateGroup(action) {
    try {
        yield axios.put(`/api/group/update`, action.payload, config);

        yield put({ type: 'GROUP_LIST' });
    } catch (error) {
        console.log('Group update request failed', error);
    }
}

function* groupSaga() {
    yield takeLatest('GROUP_LIST', groupList);
    yield takeLatest('GROUP_LIST_BY_KEYWORD', groupListByKeyword);
    yield takeLatest('ADD_GROUP', addGroup);
    yield takeLatest('DELETE_GROUP', deleteGroup);
    yield takeLatest('UPDATE_GROUP', updateGroup);
}

export default groupSaga;