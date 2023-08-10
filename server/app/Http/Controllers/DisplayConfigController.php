<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateDisplayConfigRequest;
use App\Models\DisplayConfig;
use Illuminate\Http\Response;
use Illuminate\Http\Request;

class DisplayConfigController extends Controller
{
    public function index(Request $request)
    {
    }

    public function update(UpdateDisplayConfigRequest $request, $id)
    {
        $config = DisplayConfig::find($id);
        $value = $request->input('display_config_value');
        $config->display_config_value = $value;
        $config->save();
        return $this->sentSuccessResponse($config, "Update success", Response::HTTP_OK);
    }
}
