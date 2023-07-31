<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SpecialtyResource extends JsonResource
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
            'specialty_id' => $this->specialty_id,
            'specialty_name' => $this->specialty_name,
            'major_id' => $this->major_id,
            'major_name' => $this->major_name,
            'specialty_isDelete' => $this->specialty_isDelete,
        ];
    }
}
