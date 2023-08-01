<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ResultRegisterSpecialtyResource extends JsonResource
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
            'student_code' => $this->student_code,
            'user_firstname' => $this->user->user_firstname,
            'user_lastname' => $this->user->user_lastname,
            'student_class' => $this->student_class,
            'student_score' => $this->user_score,
            'specialty_date' => $this->specialty_date,
            'specialty_id' => $this->specialty_id
        ];
    }
}