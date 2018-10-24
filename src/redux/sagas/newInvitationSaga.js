import { call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* makeNewInvitation(action) {
    try{
        yield call(axios.post, '/api/event', action.payload);
    } catch(error) {
        console.log('Error with make new invitation:', error);
    }
}

function* newInvitationSaga() {
    yield takeLatest('MAKE_NEW_INVITATION', makeNewInvitation);
}

export default newInvitationSaga;