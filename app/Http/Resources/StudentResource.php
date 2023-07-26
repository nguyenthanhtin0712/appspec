<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class StudentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
        'user_id' => $this->user_id,
        'student_code' => $this->student_code,
        'student_class' => $this->student_class,
        'student_score' => $this->student_score,
        'student_course' => $this->student_course,
        'major_id' => $this->major_id,
        'specialty_id' => $this->specialty_id,
        'speciality_date' => $this->speciality_date,
        'company_position_detail_id' => $this->company_position_detail_id,
        'mentor_code' => $this->mentor_code,
        'teacher_code' => $this->teacher_code,
        'student_isDelete' => $this->student_isDelete,
        'user_firstname' => $this->user_firstname,
        'user_lastname' => $this->user_lastname,
        'user_birthday' => $this->user_birthday,
        ];
    }
}
