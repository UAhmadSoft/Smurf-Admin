import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import ConfirmChangePriceDialog from '../dialogs/ConfirmDialogBox';

import ConfirmDeleteBox from '../dialogs/ConfirmDialogBox';
import EditUserDialog from '../dialogs/NewUserModal';
import { Container } from '@material-ui/core';
import { UsersContext } from 'src/Contexts/UsersContext';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  row: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.03)'
    }
  },
  Icons: {
    display: 'flex',
    justifyContent: 'flex-end',
    zIndex: '5',
    // right: '1px',
    // top: '0px',
    bottom: 15,
    left: 308
  },
  DeleteIcon: {
    '&:hover ': {
      // transform: 'scale(1.1)',
      opacity: '1'
    },
    borderRadius: '10px',
    background: 'red',
    padding: '0.2em',
    border: '5x',
    zIndex: ' 5',
    color: 'white',
    transition: 'all 0.3s ease-in-out',
    cursor: 'pointer',
    opacity: '0.4',
    textAlign: 'center',
    width: '40px',
    height: '40px',
    marginRight: 10
  },
  EditIcon: {
    '&:hover ': {
      // transform: 'scale(1.1)',
      opacity: '1'
    },
    borderRadius: '10px',
    background: '#58a3df',
    padding: '0.2em',
    border: '5x',
    zIndex: ' 5',
    color: 'white',
    transition: 'all 0.3s ease-in-out',
    cursor: 'pointer',
    opacity: '0.4',
    textAlign: 'center',
    width: '40px',
    height: '40px'
  }
});

const User = props => {
  const classes = useStyles();
  const { removeUser, updateAUser } = useContext(UsersContext);
  const { users, handleClick, showPopUp, order, allowActions } = props;

  const [printerId, setPrinterId] = React.useState(undefined);
  const [deleteUserId, setDeleteUserId] = React.useState(undefined);
  const [editUser, setEditUser] = React.useState(undefined);

  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false);

  const [showEditDialog, setShowEditDialog] = React.useState(false);

  const [showDeleteConfirmDialog, setshowDeleteConfirmDialog] = React.useState(
    false
  );

  const toggleConfirmDialog = () => {
    setShowConfirmDialog(!showConfirmDialog);
  };

  // ! Delete User Functions
  const toggleDeleteConfirmDialog = () => {
    setshowDeleteConfirmDialog(!showDeleteConfirmDialog);
  };

  const deleteUser = userId => {
    setDeleteUserId(userId);
    toggleDeleteConfirmDialog();

    // deleteUser(userId);
  };
  const deleteAUser = () => {
    toggleDeleteConfirmDialog();
    removeUser(deleteUserId);
    // deleteUserRedux(deleteUserId);
  };

  const handleEditUser = user => {
    setEditUser(user);
    setShowEditDialog(true);
    // updateAUser(userId);
  };

  const editAUser = ({ name, role }) => {
    setShowEditDialog(false);

    console.clear();
    console.log('edit a user');
    updateAUser({ name, role, _id: editUser._id });
    // deleteUserRedux(deleteUserId);
  };

  const handleRowClick = user => {
    if (showPopUp && showPopUp === true) {
      console.log('user', user);
      setPrinterId(user._id);

      // ! If Printer is already assigned , return
      if (alreadyAssigned(user) === true) return;

      toggleConfirmDialog();
      // handleClick(user._id);
    }
  };

  const assignOrder = () => {
    console.log('userId', printerId);

    toggleConfirmDialog();
    handleClick(printerId);
  };

  const alreadyAssigned = userr => {
    // * If ShowPopUp is true , then return false
    // console.clear();
    console.log('showPopUp', showPopUp);
    if (!showPopUp || showPopUp === false) return false;

    // ! If Printer is already assigned , return
    const isOrderAssigned = userr.orders.filter(
      orderr => JSON.stringify(orderr._id) === JSON.stringify(order._id)
    );

    console.log('isOrderAssigned', isOrderAssigned);

    return isOrderAssigned && isOrderAssigned.length > 0;
  };

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow
              style={{
                backgroundColor: 'cornflowerblue'
              }}
            >
              <TableCell
                style={{
                  textTransform: 'uppercase'
                }}
              >
                Name
              </TableCell>
              <TableCell
                style={{
                  textTransform: 'uppercase'
                }}
                align="center"
              >
                id
              </TableCell>
              <TableCell
                style={{
                  textTransform: 'uppercase'
                }}
                align="center"
              >
                Email
              </TableCell>
              <TableCell
                style={{
                  textTransform: 'uppercase'
                }}
                align="center"
              >
                Role
              </TableCell>
              <TableCell
                style={{
                  textTransform: 'uppercase'
                }}
                align="center"
              >
                Shipping Address
              </TableCell>
              <TableCell
                style={{
                  textTransform: 'uppercase'
                }}
                align="center"
              >
                Zip Code
              </TableCell>
              {allowActions && (
                <TableCell
                  style={{
                    textTransform: 'uppercase'
                  }}
                  align="center"
                >
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users.length > 0 &&
              users.map(user => (
                <>
                  <TableRow
                    key={user._id}
                    onClick={() => handleRowClick(user)}
                    className={classes.row}
                    style={{
                      backgroundColor:
                        alreadyAssigned(user) === true ? '#70f1ca' : '',
                      cursor:
                        alreadyAssigned(user) === true ? 'not-allowed' : ''
                    }}
                  >
                    <TableCell
                      component="th"
                      scope="user"
                      style={{
                        position: 'relative'
                      }}
                    >
                      {user.name}
                    </TableCell>
                    <TableCell align="center">{user._id}</TableCell>
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="center">{user.role}</TableCell>
                    <TableCell align="center">
                      {user.role === 'printer' ? 'N/A' : user.shippingAddress}
                    </TableCell>
                    <TableCell align="center">
                      {user.role === 'printer' ? 'N/A' : user.zipCode}
                    </TableCell>
                    {allowActions && (
                      <TableCell align="center">
                        <div className={classes.Icons}>
                          {allowActions.includes('delete') && (
                            <span
                              className={classes.DeleteIcon}
                              onClick={() => deleteUser(user._id)}
                            >
                              <DeleteIcon
                                style={{
                                  fontSize: '2em',
                                  paddingTop: '5px'
                                }}
                              ></DeleteIcon>
                            </span>
                          )}
                          {allowActions.includes('edit') && (
                            <span
                              className={classes.EditIcon}
                              onClick={() => handleEditUser(user)}
                            >
                              <EditIcon
                                style={{
                                  fontSize: '2em',
                                  paddingTop: '5px'
                                }}
                              ></EditIcon>
                            </span>
                          )}
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                </>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ConfirmChangePriceDialog
        open={showConfirmDialog}
        success={assignOrder}
        toggleDialog={toggleConfirmDialog}
        dialogTitle="Assign Order to Printer ?"
      />

      <ConfirmDeleteBox
        open={showDeleteConfirmDialog}
        success={deleteAUser}
        toggleDialog={toggleDeleteConfirmDialog}
        dialogTitle="Delete This User ?"
      />

      <EditUserDialog
        isOpen={showEditDialog}
        closeDialog={() => setShowEditDialog(false)}
        createNew={editAUser}
        currentUser={editUser}
        role={'printer'}
        isEdit={true}
      />
    </Container>
  );
};

export default User;
