const groupList = (state = [], action) => {
    switch (action.type) {
        case 'GET_GROUP_LIST':
            return action.payload;
        default:
            return state;
    }
}

export default groupList;