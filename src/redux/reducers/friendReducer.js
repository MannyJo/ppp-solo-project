import { combineReducers } from 'redux';

const friendList = (state = [], action) => {
    switch (action.type) {
        case 'GET_FRIEND_LIST':
            return action.payload;
        default:
            return state;
    }
}

const friendListByGroupId = (state = [], action) => {
    if (action.type === 'GET_FRIEND_LIST_BY_GROUP_ID') {
        const friends = action.payload.friendList;
        const groupId = action.payload.groupId;

        if (groupId === '0') {
            return friends;
        } else {
            const friendArray = friends.filter(friend => {
                if (Number(groupId) === friend.group_id) {
                    return friend;
                } else {
                    return false;
                }
            });

            return friendArray;
        }
    } else {
        return state;
    }
}

const friendInfo = (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE_FRIEND_INFO':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    friendList,
    friendListByGroupId,
    friendInfo,
});