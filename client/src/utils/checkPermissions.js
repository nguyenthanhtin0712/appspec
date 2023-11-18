export function checkPermissions(permissions, requiredPermissions) {
  return requiredPermissions.some((permission) => permissions.includes(permission));
}
