<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateDisplayConfigRequest;
use App\Models\DisplayConfig;
use App\Models\InternshipGraduation;
use App\Models\RegisterSpecialty;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class DisplayConfigController extends Controller
{
    public function index(Request $request)
    {
        $resultRegisterSpecialty = [];
        $resultRegisterIntern = [];

        $registerSpecialtyId = DisplayConfig::find('register_specialty')->config_value;
        $internshipGraduationId = DisplayConfig::find('register_intern')->config_value;

        if ($registerSpecialtyId) {
            $registerSpecialty = RegisterSpecialty::find($registerSpecialtyId);
            $resultRegisterSpecialty = [
                'id' => $registerSpecialty->register_specialty_id,
                'name' => $registerSpecialty->register_specialty_name
            ];
        }
        if ($internshipGraduationId) {
            $registerIntern = InternshipGraduation::find($internshipGraduationId);
            $resultRegisterIntern = [
                'id' => $internshipGraduationId,
                'name' => 'Thực tập tốt nghiệp học kỳ ' . $registerIntern->openclasstime->openclass_time_semester . ' năm học ' . $registerIntern->openclasstime->openclass_time_year
            ];
        }
        $result = [
            'register_specialty' => $resultRegisterSpecialty,
            'register_internship' => $resultRegisterIntern,
            'confirm_post' => DisplayConfig::find('confirm_post')->config_value,
            'email_contact' => DisplayConfig::find('email_contact')->config_value,
        ];
        return $this->sentSuccessResponse($result, "Get data success", Response::HTTP_OK);
    }

    public function update(UpdateDisplayConfigRequest $request, $id)
    {
        $config = DisplayConfig::find($id);
        $value = $request->input('config_value');
        $config->config_value = $value;
        $config->save();
        return $this->sentSuccessResponse($config, "Update success", Response::HTTP_OK);
    }
}
