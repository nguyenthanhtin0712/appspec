import Cookies from 'js-cookie';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { checkPermissions } from 'utils/checkPermissions';

const PrivateRoute = ({ component: Component, requiredPermissions }) => {
  const { isAuthenticated, permissions, isLoaded } = useSelector((state) => state.auth);
  if (Cookies.get('token')) {
    if (isLoaded) {
      if (!isAuthenticated) {
        return <Navigate to="/auth/login" replace={true} />;
      }
      if (requiredPermissions.length === 0 || checkPermissions(permissions, requiredPermissions)) {
        return <Component />;
      }
      return <Navigate to="/403" replace={true} />;
    }
  } else {
    return <Navigate to="/auth/login" replace={true} />;
  }
};

export default PrivateRoute;
