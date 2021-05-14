import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles
} from '@material-ui/core';
import {
  Search as SearchIcon,
  UserPlus as UserAddIcon,
  Filter as FilterIcon,
  Trash2
} from 'react-feather';
import { genMediaQuery } from 'src/utils/mediaStyles';

const useStyles = makeStyles(theme => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  ToolbarBtns: {
    '& svg': {
      marginLeft: 10
    }
  },
  SearchBox: {
    '& .MuiFormControl-root': {
      maxWidth: 500,
      [genMediaQuery('xs')]: {
        marginBottom: 20
      }
    }
  }
}));

const Toolbar = ({
  className,
  searchResults,
  handleDelete,
  selectedUserIds,
  addUser,
  toggleFilter,
  user,
  ...rest
}) => {
  const classes = useStyles();
  const [state, setState] = useState({
    searchTxt: ''
  });

  const hanldeTxtChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
    searchResults(e.target.value);
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          color="primary"
          variant="contained"
          className={`${classes.exportButton} ${classes.ToolbarBtns}`}
          onClick={toggleFilter}
        >
          Filter
          <FilterIcon />
        </Button>
        <Button
          color="primary"
          variant="contained"
          className={classes.ToolbarBtns}
          onClick={addUser}
        >
          Add {user && user === 'printer' ? 'Printer' : 'User'}
          <UserAddIcon />
        </Button>
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
              className={classes.SearchBox}
            >
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search customer"
                variant="outlined"
                value={state.searchTxt}
                onChange={hanldeTxtChange}
                name="searchTxt"
              />
              {selectedUserIds && selectedUserIds.length > 0 && (
                <Button
                  style={{
                    backgroundColor: '#ee6350',
                    color: '#fff'
                  }}
                  variant="contained"
                  className={`${classes.deleteBtn} ${classes.ToolbarBtns}`}
                  onClick={handleDelete}
                >
                  Delete
                  <Trash2 />
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
