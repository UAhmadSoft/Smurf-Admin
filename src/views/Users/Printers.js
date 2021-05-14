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

const Printers = () => {
  const classes = useStyles();
  const { usersObj, deleteMany, addNewUser, updateAUser } = useContext(
    UsersContext
  );

  console.log('usersObj', usersObj);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [filteredPrinters, setFilteredPrinters] = useState([]);
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);
  const [showNewPrinterDialog, setShowNewPrinterDialog] = useState(false);
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
  const toggleAddNewPrinterDialog = () => {
    setShowNewPrinterDialog(!showNewPrinterDialog);
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
    setFilteredPrinters(usersObj.printers);
  }, [usersObj.printers]);

  const searchResults = searchTxt => {
    console.log('searchTxt', searchTxt);
    const newUsers = usersObj.printers.filter(user =>
      user.name.toLowerCase().includes(searchTxt.toLowerCase())
    );

    console.log('newUsers', newUsers);
    setFilteredPrinters(newUsers);
  };

  const createNewUser = newUser => {
    addNewUser(newUser);
    toggleAddNewPrinterDialog();
  };

  const editUser = user => {
    setCurrentEdituser(user);
  };

  const filterUsers = criteria => {
    toggleFilterDialog();
    let newUsers;
    switch (criteria) {
      case 1:
        newUsers = filteredPrinters.sort((a, b) =>
          a.createdAt > b.createdAt ? 1 : b.createdAt > a.createdAt ? -1 : 0
        );

        console.log('newUsers', newUsers);
        break;

      case 2:
        newUsers = filteredPrinters.sort((a, b) =>
          a.createdAt > b.createdAt ? 1 : b.createdAt > a.createdAt ? -1 : 0
        );

        newUsers = newUsers.reverse();
        break;

      case 3:
        newUsers = filteredPrinters.sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        );

        break;

      case 4:
        newUsers = filteredPrinters.sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        );

        newUsers = newUsers.reverse();

        break;

      default:
        break;
    }

    setFilteredPrinters(newUsers);
  };

  console.log('filteredPrinters', filteredPrinters);
  return (
    <Page className={classes.root} title="Printers">
      <Container maxWidth="lg">
        <Toolbar
          searchResults={searchResults}
          handleDelete={handleDelete}
          selectedUserIds={selectedUserIds}
          addUser={toggleAddNewPrinterDialog}
          toggleFilter={toggleFilterDialog}
          user={'printer'}
        />
        <Box mt={3}>
          <Results
            users={filteredPrinters}
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
          isOpen={showNewPrinterDialog}
          closeDialog={toggleAddNewPrinterDialog}
          createNew={createNewUser}
          role={'Printer'}
          isEdit={false}
          editUser={currentEdituser}
        />
        <FilterDialog
          open={showFilterDialog}
          toggleDialog={toggleFilterDialog}
          filterCriteria={filterUsers}
        />
      </Container>
    </Page>
  );
};

export default Printers;
