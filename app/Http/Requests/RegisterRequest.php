<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use App\Http\Helpers\Helper;

class RegisterRequest extends FormRequest
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
            'user_email' => 'required|email|unique:users',
            'user_firstname' => 'required',
            'user_lastname' => 'required',
            'user_phone' => 'required',
            'user_avatar' => 'required',
            'user_password' => 'required|min:6',
            'user_gender' => 'required|boolean',
            'user_status' => 'required|boolean',
            'user_birthday' => 'required|date',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        Helper::sendError('Validation error', $validator->errors());
    }
}
