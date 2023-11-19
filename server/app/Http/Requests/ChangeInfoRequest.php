<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Response;
use Illuminate\Validation\Rule;

class ChangeInfoRequest extends FormRequest
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
            'user_email' => [
                'required',
                'email',
                Rule::unique('users')->ignore($this->user_id, 'user_id'),
            ],
            'user_phone' => [
                'required',
                'numeric',
                Rule::unique('users')->ignore($this->user_id, 'user_id'),
            ],
        ];
    }

    public function messages()
    {
        return [
            'user_email.required' => 'Email is required.',
            'user_email.email' => 'Invalid email format.',
            'user_phone.required' => 'Phone number is required.',
            'user_phone.numeric' => 'Phone number must be numeric.',
            'user_email.unique' => 'Số điện thoại này đã được sử dụng',
            'user_phone.unique' => 'Địa chỉ email này đã được sử dụng',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'errors' => $validator->errors(),
        ], Response::HTTP_UNPROCESSABLE_ENTITY));
    }
}
