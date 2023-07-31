<?php

namespace App\Http\Middleware;

use App\Http\Resources\LoginResource;
use Closure;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Permission;

class CheckUserRolePermission
{
  public function handle($request, Closure $next, $permissionName)
  {
      $user = Auth::user();
      $roles = $user->roles;
      foreach ($roles as $role) {
          if ($role->hasPermissionTo($permissionName)) {
              return $next($request);
          }
      }
      abort(403, 'Unauthorized no access!');
  }
}
