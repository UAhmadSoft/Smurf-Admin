import React, { useContext, useState, useEffect } from 'react';
import { Container, makeStyles, Box } from '@material-ui/core';
import Page from 'src/components/Page';
import { UsersContext } from 'src/Contexts/UsersContext';

import Results from '../customer/CustomerListView/Results';
import Toolbar from '../customer/CustomerListView/Toolbar';

import ConfirmDeleteDialog from '../dialogs/ConfirmDialogBox';

import NewUserDialog from '../dialogs/NewUserModal';
import FilterDialog from '../dialogs/FilterDialog';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Users = () => {
  const classes = useStyles();
  const { usersObj, deleteMany, addNewUser, updateAUser } = useContext(
    UsersContext
  );

  console.log('usersObj', usersObj);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);
  const [showNewUserDialog, setShowNewUserDialog] = useState(false);
  const [showFilterDialog, setShowFilterDialog] = useState(false);

  const [currentEdituser, setCurrentEdituser] = useState(null);

  const handleDelete = () => {
    toggleShowConfirmDelDialog();
  };

  const toggleFilterDialog = () => {
    setShowFilterDialog(!showFilterDialog);
  };
  const toggleShowConfirmDelDialog = () => {
    setShowConfirmDeleteDialog(!showConfirmDeleteDialog);
  };
  const toggleAddNewuserDialog = () => {
    setShowNewUserDialog(!showNewUserDialog);
  };

  const deleteUsers = async () => {
    toggleShowConfirmDelDialog();
    // * Send request to delete users

    console.log('selectedUserIds', selectedUserIds);
    // const delIds = selectedUserIds.map(id => `ObjectId(${id})`);
    deleteMany(selectedUserIds);

    setSelectedUserIds([]);
  };

  useEffect(() => {
    setFilteredUsers(usersObj.users);
  }, [usersObj.users]);

  const searchResults = searchTxt => {
    console.log('searchTxt', searchTxt);
    const newUsers = usersObj.users.filter(user =>
      user.name.toLowerCase().includes(searchTxt.toLowerCase())
    );

    console.log('newUsers', newUsers);
    setFilteredUsers(newUsers);
  };

  const createNewUser = newUser => {
    addNewUser(newUser);
    toggleAddNewuserDialog();
  };

  const editUser = user => {
    setCurrentEdituser(user);
  };

  const filterUsers = (criteria, filterRoleBy) => {
    toggleFilterDialog();
    let newUsers;
    console.log('filterRoleBy', filterRoleBy);
    switch (filterRoleBy) {
      case 0:
        newUsers = usersObj.users;

        break;

      case 1:
        newUsers = usersObj.users.filter(
          user => user.role.toLowerCase() === 'customer'
        );

        break;
      case 2:
        newUsers = usersObj.users.filter(
          user => user.role.toLowerCase() === 'printer'
        );

        break;
      case 3:
        newUsers = usersObj.users.filter(
          user => user.role.toLowerCase() === 'admin'
        );

        break;

      default:
        newUsers = usersObj.users;
    }

    console.log('newUsers filter 1', newUsers);

    switch (criteria) {
      case 1:
        newUsers = newUsers.sort((a, b) =>
          a.createdAt > b.createdAt ? 1 : b.createdAt > a.createdAt ? -1 : 0
        );

        console.log('newUsers', newUsers);
        break;

      case 2:
        newUsers = newUsers.sort((a, b) =>
          a.createdAt > b.createdAt ? 1 : b.createdAt > a.createdAt ? -1 : 0
        );

        newUsers = newUsers.reverse();
        break;

      case 3:
        newUsers = newUsers.sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        );

        break;

      case 4:
        newUsers = newUsers.sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        );

        newUsers = newUsers.reverse();

        break;

      default:
        break;
    }

    setFilteredUsers(newUsers);
  };

  console.log('filteredUsers', filteredUsers);
  return (
    <Page className={classes.root} title="Users">
      <Container maxWidth="lg">
        <Toolbar
          searchResults={searchResults}
          handleDelete={handleDelete}
          selectedUserIds={selectedUserIds}
          addUser={toggleAddNewuserDialog}
          toggleFilter={toggleFilterDialog}
        />
        <Box mt={3}>
          <Results
            users={filteredUsers}
            selectedUserIds={selectedUserIds}
            setSelectedUserIds={setSelectedUserIds}
            isEdit={true}
            editUser={editUser}
            updateUser={updateAUser}
          />
        </Box>
        <ConfirmDeleteDialog
          open={showConfirmDeleteDialog}
          toggleDialog={toggleShowConfirmDelDialog}
          dialogTitle={'Delete these Users ?'}
          success={deleteUsers}
        />
        <NewUserDialog
          isOpen={showNewUserDialog}
          closeDialog={toggleAddNewuserDialog}
          createNew={createNewUser}
          role={'Customer'}
          isEdit={false}
          editUser={currentEdituser}
        />
        <FilterDialog
          open={showFilterDialog}
          toggleDialog={toggleFilterDialog}
          filterCriteria={filterUsers}
          filterRole
        />
      </Container>
    </Page>
  );
};

export default Users;
