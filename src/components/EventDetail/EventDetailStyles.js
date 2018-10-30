const styles = theme => ({
    displayFlex: {
        textAlign: 'center',
    },
    detailFrame: {
        width: '500px',
        textAlign: 'center',
        border: '1px solid rgba(0,0,0,0.7)',
        borderRadius: '10px',
        margin: 'auto',
        boxShadow: '0 0 10px 3px rgba(0,0,0,0.2)',
        backgroundColor: 'white',
    },
    title: {
        fontSize: '40px',
        margin: '10px 0 20px 0',
    },
    message: {
        fontSize: '20px',
        margin: '10px 0 5px 0',
    },
    secretMessage: {
        fontSize: '20px',
        color: '#1759c391',
        margin: '5px 0 10px 0',
    },
    image: {
        width: '100%',
    },
    chip: {
        margin: theme.spacing.unit / 2,
    },
    button: {
        margin: '20px',
    },
    left: {
        textAlign: 'left',
        marginLeft: '10px',
    },
    label: {
        display: 'inline-block',
        width: '100px',
        textAlign: 'right',
        margin: '5px 0 5px 0',
    },
    labelContent: {
        display: 'inline-block',
        width: '300px',
        textAlign: 'left',
        margin: '5px 0 5px 0',
    },
    caption: {
        fontSize: '13px',
        occupacy: '0.7',
        display: 'inline-block'
    },
    grey: {
        color: '#888888',
    },
    red: {
        color: '#f50057',
    },
    blue: {
        color: '#3f51b5',
    }
});

export default styles;