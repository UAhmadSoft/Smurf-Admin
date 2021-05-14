import axios from 'axios';
import { initial } from 'lodash';
import React, { createContext, useState, useEffect } from 'react';
import { API_BASE_URL } from 'src/utils/API_URLS';
// import { withRouter } from 'react-router';

const AuthContext = createContext();

const AuthProvider = props => {
  let initialUser = null;

  try {
    initialUser = JSON.parse(window.localStorage.getItem('user'));
  } catch (err) {}

  const [user, setUser] = useState(initialUser);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!user || user === null) {
      window.localStorage.setItem('user', null);
      return;
    }

    (async () => {
      const res = await axios.get(`${API_BASE_URL}/adminNotify`);
      setNotifications(res.data.notifications);
    })();
    window.localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const logout = () => {
    setUser(null);
    window.location.href = '/login';
  };
  return (
    <AuthContext.Provider value={{ user, setUser, logout, notifications }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
