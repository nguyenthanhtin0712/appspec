<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RegisterSpecialtyResource extends JsonResource
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
            'register_specialty_name' => $this->register_specialty_name,
            'register_specialty_start_date' => $this->register_specialty_start_date,
            'register_specialty_end_date' => $this->register_specialty_end_date,
            'register_specialty_course' => $this->register_specialty_course
        ];
    }
}