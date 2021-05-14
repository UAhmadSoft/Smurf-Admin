const { makeStyles } = require('@material-ui/core');

const useStyles = makeStyles(theme => ({
  root: {
    width: '70%',
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper,
    // right: 20,
    margin: 'auto',
    '& .MuiTypography-body1': {
      textAlign: 'center'
    }
  },
  imageInput: {
    display: 'none'
  },
  listitem: {
    border: '1px solid lightgrey'
  },
  tag: {
    paddingTop: theme.spacing(6),
    color: '#fff',
    textAlign: 'center',
    fontSize: '2em',
    letterSpacing: '1px',
    fontWeight: '700'
  },
  icon: {
    display: 'none',
    '&:hover': {
      display: 'block'
    }
  }
}));
