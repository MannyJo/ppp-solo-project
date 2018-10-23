const friendList = (state = [], action) => {
    switch (action.type) {
        case 'GET_FRIEND_LIST':
            return action.payload;
        default:
            return state;
    }
}

export default friendList;