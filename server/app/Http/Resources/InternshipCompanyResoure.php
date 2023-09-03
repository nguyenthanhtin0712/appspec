<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class InternshipCompanyResoure extends JsonResource
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
            'company_id' => $this->company_id,
            'company_name' => $this->company_name,
            'company_phone' => $this->company_phone,
            'company_email' => $this->company_email,
            'company_address' => $this->company_address,
            'company_isInterview' => $this->company_isInterview,
            'positions' => $this->positions->map(function ($position) {
                return [
                    'position_id' => $position->position_id,
                    'position_name' => $position->position_name,
                    'position_quantity' => $position->pivot->position_quantity,
                    'company_id' => $position->company_id,
                ];
            }),
        ];
    }
}
