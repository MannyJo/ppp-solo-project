const detail = (state = {}, action) => {
    switch (action.type) {
        case 'GET_EVENT_DETAIL':
            return action.payload;
        default:
            return state;
    }
}

export default detail;