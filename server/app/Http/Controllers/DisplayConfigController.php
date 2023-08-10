<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateDisplayConfigRequest;
use App\Models\DisplayConfig;
use App\Models\RegisterSpecialty;
use Illuminate\Http\Response;
use Illuminate\Http\Request;

class DisplayConfigController extends Controller
{
    public function index(Request $request)
    {
        $registerSpecialtyId = DisplayConfig::find('register_specialty')->display_config_value;
        if ($registerSpecialtyId) {
            $registerSpecialty = RegisterSpecialty::find($registerSpecialtyId);
            $result = [
                'register_specialty' => [
                    'id' => $registerSpecialty->register_specialty_id,
                    'name' => $registerSpecialty->register_specialty_name
                ]
            ];
            return $this->sentSuccessResponse($result, "Get data success", Response::HTTP_OK);
        }
        return response()->json(['message' => 'Không tìm thấy',], 404);
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
