<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory, HasRoles;

    protected $table = 'companies';
    protected $primaryKey = 'company_id';
    public $timestamps = false;

    protected $fillable = [
        'company_id',
        'user_id',
        'company_name',
        'company_address',
        'company_host',
        'company_is_official',
        'company_isDelete',
    ];

    public function positions()
    {
        return $this->hasMany(RecruitmentPosition::class, 'company_id', 'company_id');
    }

    public function user()
    {
        return $this->hasOne(User::class, 'user_id', 'user_id');
    }
}
