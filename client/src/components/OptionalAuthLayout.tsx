import React from 'react';
import { Navigate, Outlet, useLocation, useSearchParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const OptionalAuthLayout = () => {
  const { auth } = useAuth();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  if (searchParams.get('readonly')) {
    return <Outlet />;
  }

  if (!auth.accessToken) {
    return <Navigate to={'/login'} state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default OptionalAuthLayout;
