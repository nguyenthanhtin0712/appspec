import { useSelector } from 'react-redux';

const useCheckPermissions = (requiredPermissions) => {
  const permissions = useSelector((state) => state.auth.permissions);
  console.log(permissions);
  return requiredPermissions.some((permission) => permissions.includes(permission));
};

export default useCheckPermissions;
