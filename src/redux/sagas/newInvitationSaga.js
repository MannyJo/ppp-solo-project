import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* makeNewInvitation(action) {
    try{
        const imgNameResponse = yield call(axios.post, '/api/event/fileupload', action.payload.imageFile);

        const eventResponse = yield call(axios.post, '/api/event', {...action.payload.form, fileName: imgNameResponse.data.fileName});
        yield call(axios.post, '/api/email/send', { 
            eventUrl: window.location.host + '/#/guest/' + eventResponse.data.eventId, 
            friendList: action.payload.form.selectedFriends 
        });

        yield put({ type: 'EVENT_LIST' });
    } catch(error) {
        console.log('Error with make new invitation:', error);
    }
}

function* newInvitationSaga() {
    yield takeLatest('MAKE_NEW_INVITATION', makeNewInvitation);
}

export default newInvitationSaga;