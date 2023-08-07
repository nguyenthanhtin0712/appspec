<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Response;

class StoreRegisterSpecialtyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'register_specialty_name' => 'required|string|max:255',
            'register_specialty_start_date' => 'required|date_format:Y-m-d H:i:s|after_or_equal:now',
            'register_specialty_end_date' => 'required|date_format:Y-m-d H:i:s|after:register_specialty_start_date',
            'register_specialty_detail' => 'required|array',
            'file_student' => 'required',
            
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'errors' => $validator->errors(),
        ], Response::HTTP_UNPROCESSABLE_ENTITY));
    }
}
