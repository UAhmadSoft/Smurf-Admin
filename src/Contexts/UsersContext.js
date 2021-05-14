import { initial } from 'lodash';
import React, { createContext, useState, useEffect } from 'react';
// import { withRouter } from 'react-router';
import axios from 'axios';
import { API_BASE_URL } from 'src/utils/API_URLS';

const UsersContext = createContext();

const UsersProvider = props => {
  const [usersObj, setUsersObj] = useState({
    users: [],
    printers: []
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setPrinters();
  }, [usersObj.users]);

  const updateAUser = async updatedUser => {
    const res = await axios.put(
      `${API_BASE_URL}/users/updateUser/${updatedUser._id}`,
      updatedUser
    );
    console.log('res', res);

    // * Update User from Users
    const newUsers = usersObj.users.map(user =>
      user._id === updatedUser._id
        ? {
            ...user,
            ...updatedUser
          }
        : user
    );
    setUsersObj({
      ...usersObj,
      users: newUsers
    });
  };

  const editUserOnContext = updatedUser => {
    const newUsers = usersObj.users.map(user =>
      user._id === updatedUser._id ? updatedUser : user
    );

    setUsersObj({
      ...usersObj,
      users: newUsers
    });
  };

  const deleteMany = async deleteIds => {
    const res = await axios.delete(
      `${API_BASE_URL}/users?deleteIds=${deleteIds.join(',')}`
    );

    console.log('res', res);
    deleteIds.forEach(id => {
      // * Remove User from Users
      const newUsers = usersObj.users.filter(user => user._id !== id);
      setUsersObj({
        ...usersObj,
        users: newUsers
      });
    });
  };

  const removeUser = async userId => {
    const res = await axios.delete(`${API_BASE_URL}/users/${userId}`);
    console.log('res', res);

    // * Remove User from Users
    const newUsers = usersObj.users.filter(user => user._id !== userId);
    setUsersObj({
      ...usersObj,
      users: newUsers
    });
  };

  const setPrinters = () => {
    const printers = usersObj.users.filter(user => user.role === 'printer');

    setUsersObj({
      ...usersObj,
      printers
    });
  };
  const fetchUsers = () => {
    (async () => {
      const res = await axios.get(`${API_BASE_URL}/users`);
      console.log('res', res);
      setUsersObj({
        ...usersObj,
        users: res.data.users
      });
    })();
  };

  const addNewUser = async newUser => {
    console.log('creating New user', newUser);
    const res = await axios.post(`${API_BASE_URL}/users/register`, {
      user: { ...newUser }
    });

    console.log('res', res);

    setUsersObj({
      ...usersObj,
      users: [
        ...usersObj.users,
        {
          _id: res.data._id,
          name: res.data.name,
          userId: res.data.id,
          email: res.data.email,
          password: res.data.password,
          shippingAddress: res.data.shippingAddress,
          zipCode: res.data.zipCode,
          role: res.data.role
        }
      ]
    });
  };

  return (
    <UsersContext.Provider
      value={{
        usersObj,
        setUsersObj,
        updateAUser,
        addNewUser,
        removeUser,
        deleteMany,
        editUserOnContext
      }}
    >
      {props.children}
    </UsersContext.Provider>
  );
};

export { UsersProvider, UsersContext };
