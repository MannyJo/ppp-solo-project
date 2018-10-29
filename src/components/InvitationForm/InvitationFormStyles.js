const styles = theme => ({
    newFrame: {
        backgroundColor: '#dbd5d5aa',
        width: '530px',
        margin: '20px auto',
        padding: '4px',
        borderRadius: '10px',
    },
    newForm: {
        backgroundColor: 'white',
        width: '500px',
        padding: '15px',
        borderRadius: '10px',
    },
    input: {
        width: '100%',
        padding: '12px 20px',
        margin: '8px 0',
        display: 'inline-block',
        border: '1px solid #ccc',
        boxSizing: 'border-box',
    },
    secret: {
        width: '100%',
        padding: '12px 20px',
        margin: '8px 0',
        display: 'inline-block',
        border: '1px solid #ccc',
        boxSizing: 'border-box',
        color: 'blue',
    },
    select: {
        width: '140px',
        height: '35px',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    noDisplay: {
        display: 'none',
    },
    center: {
        textAlign: 'center',
    },
    friendName: {
        width: '70%',
        textAlign: 'center',
    },
    bottomLine: {
        textAlign: 'right',
    },
    bottomButton: {
        margin: '10px',
    },
});

export default styles;