const mapKey = (state = '', action) => {
    switch (action.type) {
        case 'MAP_KEY':
            return action.payload;
        default:
            return state;
    }
}

export default mapKey;