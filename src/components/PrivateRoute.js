import React, { useContext, useEffect } from 'react';
import {Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/home');
      console.log('No user logged in')
    }else{
      console.log('User logged in : ' + currentUser.email)
    }
  })

  return children || <Outlet />;
};

export default PrivateRoute;
