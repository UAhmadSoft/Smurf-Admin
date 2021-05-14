import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import { UsersContext } from 'src/Contexts/UsersContext';
import AssignPrintersTable from '../Orders/AssignPrintersTable';
import { Printer } from 'react-feather';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
    backgroundColor: '#fff',
    color: 'black'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AssignPrintersDialog = props => {
  const {
    open,
    toggleDialog,
    order,
    assignPrinter,
    alreadyAssigned,
    unassignOrder
  } = props;
  const { usersObj } = useContext(UsersContext);
  const classes = useStyles();
  const [selectedUserIds, setSelectedUserIds] = useState([]);

  const [printers, setPrinters] = useState([]);

  const assignAPrinter = () => {
    console.log('order._id', order._id);
    console.log('selectedUserIds', selectedUserIds);
    toggleDialog();

    assignPrinter(selectedUserIds[0]);
    setSelectedUserIds([]);
  };

  const unAssignPrinter = () => {
    console.log('order._id', order._id);
    console.log('selectedUserIds', selectedUserIds);
    toggleDialog();

    unassignOrder(order._id);
    setSelectedUserIds([]);
  };

  useEffect(() => {
    setPrinters(usersObj.printers);
  }, [usersObj.printers]);

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={toggleDialog}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={toggleDialog}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Assign Order to a Printer
            </Typography>

            {selectedUserIds.length > 0 && (
              <Button
                variant="contained"
                style={{
                  backgroundColor: '#373CA9',
                  color: '#fff'
                }}
                onClick={alreadyAssigned ? unAssignPrinter : assignAPrinter}
              >
                {alreadyAssigned ? 'UnAssign' : 'Assign'}
                <Printer
                  style={{
                    marginLeft: 15
                  }}
                />
              </Button>
            )}
          </Toolbar>
        </AppBar>

        <AssignPrintersTable
          users={printers}
          handleClick={assignPrinter}
          showPopUp={true}
          order={order}
          selectedUserIds={selectedUserIds}
          setSelectedUserIds={setSelectedUserIds}
          alreadyAssigned={alreadyAssigned}
        />
      </Dialog>
    </div>
  );
};

export default AssignPrintersDialog;
