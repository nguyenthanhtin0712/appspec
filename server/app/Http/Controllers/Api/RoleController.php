<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRoleRequest;
use App\Http\Requests\UpdateRoleRequest;
use App\Http\Resources\Collection;
use App\Models\Functional;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $all = $request->input('all');
        $perPage = $request->input('perPage');
        $query = $request->input('query');
        $id = $request->input('id');
        $sortBy = $request->input('sortBy');
        $sortOrder = $request->input('sortOrder', 'asc');
        $filters = $request->input('filters');
        $roles = Role::query();
        $roles->where('isDelete', 0);
        $roles->select('id', 'name');
        if ($query) {
            $roles->where("name", "LIKE", "%$query%");
        }
        if ($id) {
            $roles->where('id', $id);
        }
        if ($sortBy) {
            $roles->orderBy($sortBy, $sortOrder);
        }
        if ($filters) {
            $filters = json_decode($filters, true);
            if (is_array($filters)) {
                foreach ($filters as $filter) {
                    $id = $filter['id'];
                    $value = $filter['value'];
                    $roles->where($id, 'LIKE', '%' . $value . '%');
                }
            }
        }
        if ($all && $all == true) {
            $roles = $roles->get();
        } else {
            $roles = $roles->paginate($perPage ?? 10);
        }
        $roleCollection = new Collection($roles);
        return $this->sentSuccessResponse($roleCollection, "Get data success", Response::HTTP_OK);
    }

    public function getPermissions()
    {
        $functionals = Functional::all()->map(function ($functional) {
            return [
                'functional_name' => $functional->functional_name,
                'permissions' => Permission::where('functional_code', $functional->functional_code)->select('permissions.name', 'permissions.desc')->get()
            ];
        });
        return $this->sentSuccessResponse($functionals, 'Get permission success!', 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreRoleRequest $request)
    {
        $name = $request->input('name');
        $permissions = $request->input('permissions');
        if (empty($permission)) {
            return $this->sentErrorResponse(null, "Permission array is empty", 399);
        }
        $role = Role::where('name', $name)->first();
        if ($role) {
            return $this->sentErrorResponse($role, "Error update role", 400);
        }
        $role = Role::create(['name' => $name]);
        $result = $role->givePermissionTo($permissions);
        return $this->sentSuccessResponse($result, "Create role success", 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $permissions = Role::findById($id)->permissions->map(function ($per) {
            return [
                'name' => $per->name
            ];
        });
        $roles = [
            'name' => Role::findById($id)->name,
            'permissions' => $permissions
        ];
        return $this->sentSuccessResponse($roles, "Get role sucess", 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateRoleRequest $request, $id)
    {
        $name = $request->input('name');
        $permission = $request->input('permissions');
        if (empty($permission)) {
            return $this->sentErrorResponse(null, "Permission array is empty", 400);
        }
        $existingRole = Role::where('id', '!=', $id)->where('name', $name)->first();
        if ($existingRole) {
            return $this->sentErrorResponse(null, "Role with the same name already exists", 400);
        }
        $role = Role::findOrFail($id);
        $role->syncPermissions($permission);
        $role->name = $name;
        $role->save();

        return $this->sentSuccessResponse($role, "Update role success", 200);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $role = Role::where('id', $id)->firstOrFail();
        $role->isDelete = 1;
        $role->save();
        return $this->sentSuccessResponse($role, "Delete role success", Response::HTTP_OK);
    }
}
