<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
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
        $roles->select('id','name');
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

    public function getPermissions(){
        $functionals = Functional::all()->map(function($functional){
            return [
                'functional_code' => $functional->functional_code,
                'functional_name' => $functional->functional_name,
                'permissions' => Permission::where('name', 'LIKE', "%{$functional->functional_code}%")->get()
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
