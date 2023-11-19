import { useSelector } from 'react-redux';

const useCheckPermissions = (requiredPermissions) => {
  const permissions = useSelector((state) => state.auth.permissions);
  return requiredPermissions.some((permission) => permissions.includes(permission));
};

export default useCheckPermissions;
