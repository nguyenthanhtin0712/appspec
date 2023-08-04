<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Response;

class AddScoreStudentRequest extends FormRequest
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
            'data' => 'required|array',
            'data.*.user_firstname' => 'required|string',
            'data.*.user_lastname' => 'required|string',
            'data.*.user_birthday' => 'required|date',
            'data.*.student_code' => 'required|string|unique:students,student_code', // Thêm quy tắc unique để đảm bảo mã sinh viên không bị trùng lặp
            'data.*.student_score' => 'required|numeric',
            'data.*.student_class' => 'required|string',
            'data.*.major_id' => 'required|exists:majors,major_id',
            'password' => 'required|string|min:6',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'errors' => $validator->errors(),
        ], Response::HTTP_UNPROCESSABLE_ENTITY));
    }
}
