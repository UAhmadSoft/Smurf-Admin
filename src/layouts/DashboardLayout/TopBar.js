import React, { useState, useContext, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';
import { AuthContext } from 'src/Contexts/AuthContext';
import { Bell } from 'react-feather';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60
  },
  Dialog: {
    '& .MuiDialog-paper': {
      top: '0',
      right: '0',
      position: 'absolute',
      margin: '10px'
    }
  }
}));

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();

  const { logout } = useContext(AuthContext);
  return (
    <>
      <AppBar
        className={clsx(classes.root, className)}
        elevation={0}
        {...rest}
      >
        <Toolbar>
          <RouterLink
            to="/"
            style={{
              color: '#fff'
            }}
          >
            <h3>Accent Walls</h3>
          </RouterLink>
          <Box flexGrow={1} />
          <Hidden mdDown>
            <IconButton color="inherit" onClick={logout}>
              <InputIcon />
            </IconButton>
          </Hidden>
          <Hidden lgUp>
            <IconButton color="inherit" onClick={onMobileNavOpen}>
              <MenuIcon />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
    </>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;
