<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Response;
use Illuminate\Validation\Rule;

class UpdateJobholderRequest extends FormRequest
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
            'user_id' => ['required', Rule::exists('users', 'user_id')],
            'user_gender' => 'required',
            'user_firstname' => 'required',
            'user_lastname' => 'required',
            'user_birthday' => 'required',
            'user_email' => [
                'required',
                Rule::unique('users')->ignore($this->user_id, 'user_id'),
            ],
            'user_phone' => 'required',
            'jobholder_code' => [
                'required',
                Rule::unique('job_holders')->ignore($this->user_id, 'user_id'),
            ],
            'jobholder_position' => 'required',
            'jobholder_specialty' => 'required',
            'jobholder_type' => 'required',
            'jobholder_unit' => 'required',
            'jobholder_degree' => 'required',
            'academic_field_id' => 'required',
            'jobholder_isLeader' => 'required',
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
