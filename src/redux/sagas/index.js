import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import eventSaga from './eventSaga';
import groupSaga from './groupSaga';
import friendSaga from './friendSaga';
import newInvitationSaga from './newInvitationSaga';
import eventDetailSaga from './eventDetailSaga';
import guestSaga from './guestSaga';
import adminSaga from './adminSaga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    eventSaga(),
    groupSaga(),
    friendSaga(),
    newInvitationSaga(),
    eventDetailSaga(),
    guestSaga(),
    adminSaga(),
  ]);
}
