import React, { useState, useContext } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { Formik } from 'formik';

import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';

import { AuthContext } from '../../Contexts/AuthContext';
import { API_BASE_URL } from '../../utils/API_URLS';
import { toast } from 'react-toastify';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const LoginView = () => {
  const classes = useStyles();

  const { setUser } = useContext(AuthContext);

  const [state, setState] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Page className={classes.root} title="Login">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: 'demo@devias.io',
              password: 'Password123'
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required'),
              password: Yup.string()
                .max(255)
                .required('Password is required')
            })}
            onSubmit={async () => {
              try {
                const res = await axios.post(
                  `${API_BASE_URL}/users/login`,
                  {
                    email: state.email,
                    password: state.password
                  }
                );

                console.log('res', res);

                if (res.data.user.role === 'admin') {
                  // * Set User On Context
                  setUser({
                    access_token: res.data.access_token,
                    email: res.data.email,
                    name: res.data.name,
                    _id: res.data.userId,
                    role: res.data.role,
                    image: res.data.image
                  });

                  toast.success('Login Successfull ! Redirecting', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                  });

                  window.location.href = '/app/users';
                } else {
                  toast.error('You are NOT Admin', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                  });
                }
              } catch (err) {
                toast.error('You are NOT Admin', {
                  position: 'top-right',
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined
                });
                console.log('err', err);
              }
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    Sign in
                  </Typography>
                </Box>

                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleInputChange}
                  type="email"
                  value={state.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleInputChange}
                  type="password"
                  value={state.password}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;
