const dialogOpen = (state = false, action) => {
    switch (action.type) {
        case 'OPEN_DIALOG':
            return true;
        case 'CLOSE_DIALOG':
            return false;
        default:
            return state;
    }
}

export default dialogOpen;