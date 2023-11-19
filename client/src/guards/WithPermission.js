import React from 'react';
import useCheckPermissions from 'hooks/useCheckPermissions';

const WithPermission = ({ requiredPermission, children }) => {
  const hasPermission = useCheckPermissions(requiredPermission);
  return hasPermission ? <>{children}</> : null;
};

export default WithPermission;
