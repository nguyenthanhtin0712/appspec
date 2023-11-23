<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Response;

class StoreJobholderRequest extends FormRequest
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
            "user_firstname" => "required",
            "user_lastname" => "required",
            "user_email" => "required|unique:users,user_email",
            "user_phone" => "required|unique:users,user_phone",
            "user_gender" => "required",
            "user_birthday" => "required",
            "user_password" => "required",
            "jobholder_code" => "required|unique:job_holders,jobholder_code",
            "title_id" => "required",
            "academic_field_id" => "required",
            "jobholder_isLeader" => "required"
        ];
    }

    public function messages()
    {
        return [
            'user_email.unique' => 'Địa chỉ email này đã được sử dụng',
            'user_phone.unique' => 'Số điện thoại này đã được sử dụng',
            'jobholder_code.unique' => 'Mã viên chức đã tồn tại'
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'errors' => $validator->errors(),
        ], Response::HTTP_UNPROCESSABLE_ENTITY));
    }
}
