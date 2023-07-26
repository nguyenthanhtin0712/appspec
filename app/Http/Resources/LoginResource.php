<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class LoginResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $attributes = $this->getAttributes();
        unset($attributes['user_password']);
        $token = $this->createToken("user");
        $data = [
            'user_info' => $attributes,
            'accessToken' => $token->accessToken,
            'roles' => $this->roles->pluck('name') ?? [],
            'roles.permissions' => $this->getPermissionsViaRoles() ?? [],
        ];

        return $data;
    }
}
