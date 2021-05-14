import 'react-perfect-scrollbar/dist/css/styles.css';
import React, { useContext } from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import theme from 'src/theme';
import routes from 'src/routes';
import './App.css';
import { AuthContext } from './Contexts/AuthContext';
import NotFoundView from './views/errors/NotFoundView';

import { Navigate } from 'react-router';
import LoginView from './views/auth/LoginView';
import MainLayout from './layouts/MainLayout';

const App = () => {
  const routing = useRoutes(routes);
  const { user } = useContext(AuthContext);
  const unAuthRoutes = useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: 'login', element: <LoginView /> },
        { path: '404', element: <NotFoundView /> },
        { path: '/', element: <Navigate to="/login" /> },
        { path: '*', element: <Navigate to="/login" /> }
      ]
    }
  ]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {!user || user === null ? unAuthRoutes : routing}
    </ThemeProvider>
  );
};

export default App;
