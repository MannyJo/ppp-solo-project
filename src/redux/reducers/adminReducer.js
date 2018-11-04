const userCount = (state = 0, action) => {
    switch (action.type) {
        case 'USER_COUNT':
            return action.payload;
        default:
            return state;
    }
}

export default userCount;