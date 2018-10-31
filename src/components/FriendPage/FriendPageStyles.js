import { fade } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
    frame: {
        minWidth: '800px',
        maxWidth: '1000px',
        overflowX: 'auto',
        margin: '50px auto',
    },
    button: {
      margin: theme.spacing.unit,
      textAlign: 'right',
      backgroundColor: '#544877',
      '&:hover': {
        backgroundColor: '#6c4ec3',
      },
      color: 'white',
    },
    center: {
        textAlign: 'center',
    },
    iconColumn: {
        textAlign: 'center',
        width: '150px',
    },
    grow: {
      flexGrow: 1,
    },
    toolbar: {
        backgroundColor: '#8e9ce0',
        borderRadius: '3px',
    },
    title: {
      margin: '30px 50px',
      color: 'white',
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing.unit,
        width: 'auto',
      },
      color: 'white',
    },
    searchIcon: {
      width: theme.spacing.unit * 9,
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    searchSelect: {
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        color: 'white',
        border: 'none',
        height: theme.spacing.unit * 4.3,
        outline: 'none',
    },
    inputRoot: {
      color: 'inherit',
      width: '100%',
    },
    inputInput: {
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 10,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 120,
        '&:focus': {
          width: 200,
        },
      },
    },
});

export default styles;