import { combineReducers } from 'redux';

const isVerified = (state = false, action) => {
    switch (action.type) {
        case 'IS_VERIFIED':
            return action.payload;
        default:
            return state;
    }
}

const invitation = (state = {}, action) => {
    switch (action.type) {
        case 'GET_INVITATION':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    isVerified, 
    invitation
});