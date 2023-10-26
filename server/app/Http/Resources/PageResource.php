<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PageResource extends JsonResource
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
            'page_id' => $this->page_id,
            'page_slug' => $this->page_slug,
            'page_title' => $this->page_title,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
