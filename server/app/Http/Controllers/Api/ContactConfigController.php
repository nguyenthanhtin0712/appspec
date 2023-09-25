<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactConfig;
use Illuminate\Http\Request;

class ContactConfigController extends Controller
{
    public function getInfo(){
        $result = ContactConfig::find(1);
        return $this->sentSuccessResponse($result, 'Get config contact success!', 200);
    }

    public function updateContactConfig(Request $request){
        $value = $request->input('value');
        $result = ContactConfig::find(1)->update($value)->first();
        return $this->sentSuccessResponse($result, 'Update config contact success!', 200);
    }
}
