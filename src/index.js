import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './Contexts/AuthContext';
import { UsersProvider } from './Contexts/UsersContext';
import { SocketProvider } from './Contexts/SocketContext';

ReactDOM.render(
  //   <SocketProvider>
  <AuthProvider>
    <UsersProvider>
      <BrowserRouter>
        <ToastContainer />
        <App />
      </BrowserRouter>
    </UsersProvider>
  </AuthProvider>,
  //   </SocketProvider>,

  document.getElementById('root')
);

serviceWorker.unregister();
