import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { blue, red } from '@material-ui/core/colors';

import CheckIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

import uuid from 'uuid/dist/v4';

const useStyles = makeStyles({
  root: {},
  Title: {
    // width: '300px',
    '& h2': {
      fontFamily: 'sans-serif'
    }
  },
  List: {
    '& span': {
      fontFamily: 'sans-serif'
    }
  },
  yesIcon: {
    backgroundColor: blue[100],
    color: blue[600]
  },
  cancelIcon: {
    backgroundColor: red[100],
    color: red[600]
  }
});

export default function DeletePaletteConfirm(props) {
  const { open, toggleDialog, dialogTitle, success } = props;
  const classes = useStyles();

  return (
    <Dialog
      onClose={toggleDialog}
      aria-labelledby="simple-dialog-title"
      open={open}
      className={classes.root}
    >
      <DialogTitle id="simple-dialog-title" className={classes.Title}>
        {dialogTitle}
      </DialogTitle>
      <List className={classes.List}>
        <ListItem button onClick={success} key={uuid()}>
          <ListItemAvatar>
            <Avatar className={classes.yesIcon}>
              <CheckIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Yes" />
        </ListItem>

        <ListItem button onClick={toggleDialog} key={uuid()}>
          <ListItemAvatar>
            <Avatar className={classes.cancelIcon}>
              <CancelIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Cancel" />
        </ListItem>
      </List>
    </Dialog>
  );
}
