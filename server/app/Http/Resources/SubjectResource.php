<?php

namespace App\Http\Resources;

use App\Models\Subject;
use Illuminate\Http\Resources\Json\JsonResource;

class SubjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $this->refresh();
        return [
            'subject_id' => $this->subject_id,
            'subject_name' => $this->subject_name,
            'subject_credit' => $this->subject_credit,
            'subject_coeffcient' => $this->subject_coeffcient,
            'subject_LT' => $this->subject_LT,
            'subject_BT' => $this->subject_BT,
            'subject_TH' => $this->subject_TH,
            'academic_field_id' => $this->academic_field_id,
            'subject_previous' => $this->subject_previous->pluck('subject_id')->toArray()
        ];
    }
}
