<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;


class UserResource extends JsonResource
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
            'user_email' => $this->user_email,
            'user_firstname' => $this->user_firstname,
            'user_lastname' => $this->user_lastname,
            'user_phone' => $this->user_phone,
            'user_avatar' => $this->user_avatar,
            'user_gender' => $this->user_gender,
            'user_status' => $this->user_status,
            'user_birthday' => $this->user_birthday,
            'user_isDelete' => $this->user_isDelete
        ];
    }
}
