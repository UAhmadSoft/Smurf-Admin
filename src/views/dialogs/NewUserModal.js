import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { toast } from 'react-toastify';
import validator from 'validator';
import { zip } from 'lodash';

const AdminNewUserModal = props => {
  const {
    isOpen,
    closeDialog,
    createNew,
    role,
    isEdit,
    editUser,
    updateUser
  } = props;

  const [nameTxt, setNameTxt] = useState('');
  const [newRoleTxt, setnewRoleTxt] = useState('');
  const [emailTxt, setEmailTxt] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [shippingAdd, setShippingAdd] = useState('');
  const [passwordTxt, setPasswordTxt] = useState('');

  useEffect(() => {
    if (!isEdit || !editUser) return;
    setNameTxt(editUser.name);

    setnewRoleTxt(editUser.role);
    setZipCode(editUser.zipCode);
    setShippingAdd(editUser.shippingAddress);
  }, [editUser, isEdit]);

  const handleNameChange = e => {
    setNameTxt(e.target.value);
  };
  const handleEmailChange = e => {
    setEmailTxt(e.target.value);
  };
  const handlePasswordChange = e => {
    setPasswordTxt(e.target.value);
  };
  const handleZipCodeChange = e => {
    setZipCode(e.target.value);
  };
  const handleShipAddChange = e => {
    setShippingAdd(e.target.value);
  };

  // const handleNameChange = (e) => {
  //    setNameTxt(e.target.value)
  // }

  const handleSubmit = e => {
    e.preventDefault();

    // Shit Validations

    let valMessages = [];
    let valFailed = false;
    if (!nameTxt || nameTxt.length < 1) {
      valFailed = true;
      valMessages.push('Name must NOT be Empty');
    }

    if (!validator.isEmail(emailTxt)) {
      valFailed = true;
      valMessages.push('Invalid Or Empty Email');
    }

    var regularExpression = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    // var passvalid = passwordTxt.match(/^[a-zA-Z0-9 ]*$/);

    if (!passwordTxt || passwordTxt.length < 6) {
      valFailed = true;
      valMessages.push('Password must NOT be less than 6 characters ');
    }

    if (!regularExpression.test(passwordTxt)) {
      valFailed = true;
      valMessages.push(
        'Password must contain at least 1 number and 1 special Character '
      );
    }

    if (role === 'customer') {
      if (!zipCode || zipCode.length < 0) {
        valFailed = true;
        valMessages.push('ZipCode must NOT be Empty ');
      }

      if (!shippingAdd || shippingAdd.length < 0) {
        valFailed = true;
        valMessages.push('ShippingAddress must NOT be Empty ');
      }
    }
    valFailed
      ? valMessages.forEach(msg =>
          toast.error(msg, {
            position: 'top-right',
            // autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          })
        )
      : createNew({
          name: nameTxt,
          email: emailTxt,
          zipCode,
          shippingAddress: shippingAdd,
          password: passwordTxt,
          role: role.toLowerCase()
        });
  };

  const handleEditSubmit = e => {
    e.preventDefault();

    // Shit Validations

    let valMessages = [];
    let valFailed = false;
    if (!nameTxt || nameTxt.length < 1) {
      valFailed = true;
      valMessages.push('Name must NOT be Empty');
    }

    valFailed
      ? valMessages.forEach(msg =>
          toast.error(msg, {
            position: 'top-right',
            // autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          })
        )
      : updateUser({
          ...editUser,
          name: nameTxt,
          role: newRoleTxt.toLowerCase(),
          zipCode: zipCode,
          shippingAddress: shippingAdd
        });

    setNameTxt('');
    setnewRoleTxt('');
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={closeDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {isEdit ? `Edit ${editUser && editUser.role}` : `Add New ${role}`}
          {/* Add New User */}
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
                  To subscribe to this website, please enter your
                  email address here. We will send updates
                  occasionally.
               </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            // type='email'
            fullWidth
            value={nameTxt}
            onChange={handleNameChange}
          />
          {isEdit && (
            <>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={newRoleTxt}
                  // onChange={handleChange}
                  onChange={e => setnewRoleTxt(e.target.value)}
                >
                  <MenuItem value={'printer'}>printer</MenuItem>
                  <MenuItem value={'customer'}>customer</MenuItem>
                  <MenuItem value={'admin'}>admin</MenuItem>
                </Select>
              </FormControl>
              <TextField
                autoFocus
                margin="dense"
                id="shippingADD"
                label="Shipping Address"
                type="shippingADD"
                fullWidth
                value={shippingAdd}
                onChange={handleShipAddChange}
              />
              <TextField
                autoFocus
                margin="dense"
                id="zipCode"
                label="Zip Code"
                type="number"
                fullWidth
                value={zipCode}
                onChange={handleZipCodeChange}
              />
            </>
            // <TextField
            //    autoFocus
            //    margin='dense'
            //    id='role'
            //    label='Role'
            //    // type='email'
            //    fullWidth
            //    value={newRoleTxt}
            //    onChange={(e) => setnewRoleTxt(e.target.value)}
            // />
          )}
          {isEdit === false && (
            <>
              {' '}
              <TextField
                autoFocus
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                fullWidth
                value={emailTxt}
                onChange={handleEmailChange}
              />
              <TextField
                autoFocus
                margin="dense"
                id="password"
                label="Password"
                type="password"
                fullWidth
                value={passwordTxt}
                onChange={handlePasswordChange}
              />
              <TextField
                autoFocus
                margin="dense"
                id="shipppingAddress"
                label="Shipping Address"
                type="shipppingAddress"
                fullWidth
                value={shippingAdd}
                onChange={handleShipAddChange}
              />
              <TextField
                autoFocus
                margin="dense"
                id="zipCode"
                label="Zip Code"
                type="zipCode"
                fullWidth
                value={zipCode}
                onChange={handleZipCodeChange}
              />
            </>
          )}
          <></>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={isEdit === true ? handleEditSubmit : handleSubmit}
            variant="contained"
            color="primary"
            style={{
              backgroundColor: '#373CA9',
              color: '#fff',
              textTransform: 'capitalize'
            }}
          >
            {isEdit === true ? 'Update' : 'Create'}
          </Button>
          <Button
            onClick={closeDialog}
            variant="contained"
            color="primary"
            style={{
              backgroundColor: 'red',
              color: '#fff',
              textTransform: 'capitalize'
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminNewUserModal;
