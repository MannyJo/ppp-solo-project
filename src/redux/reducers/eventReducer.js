const eventList = (state = [], action) => {
    switch (action.type) {
        case 'GET_EVENT_LIST':
            return action.payload;
        default:
            return state;
    }
}

export default eventList;