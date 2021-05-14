/* eslint-disable linebreak-style */
import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import Printers from './views/Users/Printers';
import Users from './views/Users/Users';
import Logout from './Logout';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'users', element: <Users /> },
      { path: 'printers', element: <Printers /> },
      { path: 'logout', element: <Logout /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
