import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Checkbox,
  TableRow,
  TableCell,
  Box,
  Typography,
  Divider,
  TableBody,
  DialogActions,
  Button
} from '@material-ui/core';
import { ArrowUp } from 'react-feather';
import { withStyles } from '@material-ui/styles';
import { genMediaQuery } from 'src/utils/mediaStyles';
const styles = {
  Dialog: {
    '& .MuiDialog-paper': {
      width: '60%',
      [genMediaQuery('xs')]: {
        width: '80%'
      }
    }
  }
};

const FilterDialog = ({ open, toggleDialog, filterCriteria, classes }) => {
  const [filter, setFilter] = useState(1);
  const [role, setRole] = useState(0);
  return (
    <Dialog open={open} onClose={toggleDialog} className={classes.Dialog}>
      <DialogTitle>Filter Users</DialogTitle>
      <Divider />
      <DialogContent>
        <Typography color="textPrimary" variant="h5">
          Choose 1 from here
        </Typography>
        <TableBody>
          <TableRow>
            <TableCell>
              <Checkbox
                checked={filter === 1}
                onChange={() => setFilter(1)}
                value="true"
              ></Checkbox>
            </TableCell>
            <TableCell>
              <Box alignItems="center" display="flex">
                <ArrowUp style={{ marginRight: 10 }} />
                <Typography color="textPrimary" variant="body1">
                  Oldest First
                </Typography>
              </Box>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Checkbox
                checked={filter === 2}
                onChange={() => setFilter(2)}
                value="true"
              ></Checkbox>
            </TableCell>
            <TableCell>
              <Box alignItems="center" display="flex">
                <ArrowUp style={{ marginRight: 10 }} />
                <Typography color="textPrimary" variant="body1">
                  Latest First
                </Typography>
              </Box>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Checkbox
                checked={filter === 3}
                onChange={() => setFilter(3)}
                value="true"
              ></Checkbox>
            </TableCell>
            <TableCell>
              <Box alignItems="center" display="flex">
                <ArrowUp style={{ marginRight: 10 }} />
                <Typography color="textPrimary" variant="body1">
                  A-Z
                </Typography>
              </Box>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Checkbox
                checked={filter === 4}
                onChange={() => setFilter(4)}
                value="true"
              ></Checkbox>
            </TableCell>
            <TableCell>
              <Box alignItems="center" display="flex">
                <ArrowUp style={{ marginRight: 10 }} />
                <Typography color="textPrimary" variant="body1">
                  Z-A
                </Typography>
              </Box>
            </TableCell>
          </TableRow>
        </TableBody>

        <Divider />

        <Typography color="textPrimary" variant="h5">
          Choose 1 from here
        </Typography>
        <TableBody>
          <TableRow>
            <TableCell>
              <Checkbox
                checked={role === 0}
                onChange={() => setRole(0)}
                value="true"
              ></Checkbox>
            </TableCell>
            <TableCell>
              <Box alignItems="center" display="flex">
                <Typography color="textPrimary" variant="body1">
                  All
                </Typography>
              </Box>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Checkbox
                checked={role === 1}
                onChange={() => setRole(1)}
                value="true"
              ></Checkbox>
            </TableCell>
            <TableCell>
              <Box alignItems="center" display="flex">
                <Typography color="textPrimary" variant="body1">
                  Customers
                </Typography>
              </Box>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Checkbox
                checked={role === 2}
                onChange={() => setRole(2)}
                value="true"
              ></Checkbox>
            </TableCell>
            <TableCell>
              <Box alignItems="center" display="flex">
                <Typography color="textPrimary" variant="body1">
                  Printers
                </Typography>
              </Box>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Checkbox
                checked={role === 3}
                onChange={() => setRole(3)}
                value="true"
              ></Checkbox>
            </TableCell>
            <TableCell>
              <Box alignItems="center" display="flex">
                <Typography color="textPrimary" variant="body1">
                  Admins
                </Typography>
              </Box>
            </TableCell>
          </TableRow>
        </TableBody>
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={() => filterCriteria(filter, role)}
        >
          Filter
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withStyles(styles)(FilterDialog);
