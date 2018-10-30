import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
};

function* verifyGuest(action) {
    try {
        const id = action.payload.id;
        const email = encodeURIComponent(action.payload.email);

        const isVerifiedResponse = yield call(axios.get, `/api/guest/${id}/${email}`, config);
        const isVerified = isVerifiedResponse.data.isVerified;

        if(isVerified){
            yield put({ type: 'IS_VERIFIED', payload: isVerified });
            yield put({ type: 'GET_INVITATION', payload: isVerifiedResponse.data.invitation[0] });
        }
    } catch(error) {
        console.log('Error verifying guest :', error);
    }
}

function* sendAttendCode(action) {
    try {
        yield call(axios.post, '/api/guest', action.payload, config);
        yield put({ type: 'VERIFY_GUEST', payload: { email: action.payload.email, id: action.payload.eventId } });
    } catch(error) {
        console.log('Error sending attend code :', error);
    }
}

function* guestSaga() {
    yield takeLatest('VERIFY_GUEST', verifyGuest);
    yield takeLatest('SEND_ATTEND_CD', sendAttendCode);
}

export default guestSaga;