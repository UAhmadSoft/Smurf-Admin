import React, { useState, useContext } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  makeStyles,
  Button
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';

import EditUserDialog from '../../dialogs/NewUserModal';
import { Edit } from 'react-feather';
import { UsersContext } from 'src/Contexts/UsersContext';
const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2),
    backgroundColor: '#0D8ABC',
    color: '#fff'
  }
}));

const Results = ({
  className,
  //   customers,
  selectedUserIds,
  setSelectedUserIds,
  users,
  isEdit,
  editUser,
  ...rest
}) => {
  const classes = useStyles();
  // const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [currentEdituser, setCurrentEdituser] = useState(null);

  const { updateAUser } = useContext(UsersContext);

  const [showEditUserDialog, setShowEditUserDialog] = useState(false);

  const toggleEditDialog = () => {
    setShowEditUserDialog(!showEditUserDialog);
  };

  const handleSelectAll = event => {
    let newSelectedUserIds;

    if (event.target.checked) {
      newSelectedUserIds = users.map(user => user._id);
    } else {
      newSelectedUserIds = [];
    }

    setSelectedUserIds(newSelectedUserIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedUserIds.indexOf(id);
    let newSelectedUserIds = [];

    if (selectedIndex === -1) {
      newSelectedUserIds = newSelectedUserIds.concat(
        selectedUserIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedUserIds = newSelectedUserIds.concat(
        selectedUserIds.slice(1)
      );
    } else if (selectedIndex === selectedUserIds.length - 1) {
      newSelectedUserIds = newSelectedUserIds.concat(
        selectedUserIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedUserIds = newSelectedUserIds.concat(
        selectedUserIds.slice(0, selectedIndex),
        selectedUserIds.slice(selectedIndex + 1)
      );
    }

    setSelectedUserIds(newSelectedUserIds);
  };

  const handleEditClick = user => {
    setCurrentEdituser(user);

    setTimeout(() => {
      toggleEditDialog();
    }, 500);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  {users && users.length > 0 && (
                    <Checkbox
                      checked={
                        selectedUserIds &&
                        selectedUserIds.length === users.length
                      }
                      color="primary"
                      indeterminate={
                        selectedUserIds &&
                        selectedUserIds.length > 0 &&
                        selectedUserIds.length < users.length
                      }
                      onChange={handleSelectAll}
                    />
                  )}
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>

                {isEdit && <TableCell>Edit</TableCell>}
              </TableRow>
            </TableHead>
            {users && users.length > 0 && (
              <TableBody>
                {users.map(user => (
                  <TableRow
                    hover
                    key={user._id}
                    selected={
                      selectedUserIds &&
                      selectedUserIds.indexOf(user._id) !== -1
                    }
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={
                          selectedUserIds &&
                          selectedUserIds.indexOf(user._id) !== -1
                        }
                        onChange={event =>
                          handleSelectOne(event, user._id)
                        }
                        value="true"
                      />
                    </TableCell>
                    <TableCell>
                      <Box alignItems="center" display="flex">
                        <Avatar
                          className={classes.avatar}
                          src={user.image}
                        >
                          {getInitials(user.name)}
                        </Avatar>
                        <Typography
                          color="textPrimary"
                          variant="body1"
                        >
                          {user.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    {isEdit && (
                      <TableCell>
                        <Button
                          variant="contained"
                          style={{
                            minWidth: 'unset',
                            padding: 5,
                            backgroundColor: '#58a3df'
                          }}
                          onClick={() => handleEditClick(user)}
                        >
                          <Edit
                            style={{
                              color: '#fff'
                            }}
                          />
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </Box>
      </PerfectScrollbar>

      <EditUserDialog
        isOpen={showEditUserDialog}
        closeDialog={toggleEditDialog}
        // createNew={createNewUser}
        // role={'customer'}
        isEdit={true}
        editUser={currentEdituser}
        updateUser={updatedUser => {
          toggleEditDialog();
          updateAUser(updatedUser);
        }}
      />
    </Card>
  );
};

export default Results;
