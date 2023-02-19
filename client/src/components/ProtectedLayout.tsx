import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProtectedLayout = () => {
  const { auth } = useAuth();
  const location = useLocation();

  if (!auth.user) {
    return <Navigate to={'/login'} state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
