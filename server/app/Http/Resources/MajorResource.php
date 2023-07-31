<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MajorResource extends JsonResource
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
            'major_id' => $this->major_id,
            'major_name' => $this->major_name,
            'major_isDelete' => $this->major_isDelete,
        ];
    }
}
