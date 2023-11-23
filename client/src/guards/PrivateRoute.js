import useCheckPermissions from 'hooks/useCheckPermissions';
import Cookies from 'js-cookie';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, requiredPermissions }) => {
  const { isAuthenticated, isLoaded } = useSelector((state) => state.auth);
  const hasPermission = useCheckPermissions(requiredPermissions);

  if (Cookies.get('token')) {
    if (isLoaded) {
      if (!isAuthenticated) {
        return <Navigate to="/auth/login" replace={true} />;
      }
      if (requiredPermissions.length === 0 || hasPermission) {
        return <Component />;
      }
      return <Navigate to="/error/403" replace={true} />;
    }
  } else {
    return <Navigate to="/auth/login" replace={true} />;
  }
};

export default PrivateRoute;
