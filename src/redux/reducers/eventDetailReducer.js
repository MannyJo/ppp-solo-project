import { combineReducers } from 'redux';

const detail = (state = {}, action) => {
    switch (action.type) {
        case 'GET_EVENT_DETAIL':
            return action.payload;
        default:
            return state;
    }
}

const members = (state = [], action) => {
    switch (action.type) {
        case 'GET_EVENT_MEMBERS':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({detail, members});