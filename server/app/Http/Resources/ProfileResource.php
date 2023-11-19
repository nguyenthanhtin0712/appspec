<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProfileResource extends JsonResource
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
            'user_firstname' => $this->user_firstname,
            'user_lastname' => $this->user_lastname,
            'user_birthday' => $this->user_birthday,
            'student_code' => $this->student_code,
            'student_class' => $this->student_class,
            'student_score' => $this->student_score,
            'student_course' => $this->student_course,
            'major_name' => $this->major->major_name,
            'specialty_name' => $this->specialty ? $this->specialty->specialty_name : null,
        ];
    }
}
