<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactConfig;
use Illuminate\Http\Request;

class ContactConfigController extends Controller
{
    public function getInfo(){
        $result = ContactConfig::where('contact_config_id', 1)->select('department_name', 'department_address', 'department_phone', 'department_email', 'admin_name', 'admin_phone', 'admin_email')->first();
        return $this->sentSuccessResponse($result, 'Get config contact success!', 200);
    }

    public function updateContactConfig(Request $request){
        $value = $request->input('value');
        $result = ContactConfig::where('contact_config_id', 1)->update($value);
        return $this->sentSuccessResponse($result, 'Update config contact success!', 200);
    }
}
