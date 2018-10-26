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

// function* invitaionDetail(action) {
//     try{
//         const id = action.payload.id;
//         const email = encodeURIComponent(action.payload.email);
//         const invitationResponse = yield call(axios.get, `/api/guest/invitation/${id}/${email}`, config);

//         yield put({ type: 'GET_INVITATION', payload: invitationResponse.data });
//     } catch(error) {
//         console.log('Error guest\'s invitation :', error);
//     }
// }

function* guestSaga() {
    yield takeLatest('VERIFY_GUEST', verifyGuest);
    // yield takeLatest('INVITATION_DETAIL', invitaionDetail);
}

export default guestSaga;