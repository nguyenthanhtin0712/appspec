<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Database\Eloquent\Model;

class InternshipCompany extends Model
{
    use HasFactory, HasRoles;

    protected $table = 'internship_company';
    protected $primaryKey = 'company_id';
    public $timestamps = false;

    protected $fillable = [
        'company_id',
        'company_name',
        'company_phone',
        'company_email',
        'company_address',
        'company_host',
        'company_is_official',
        'company_isDelete',
    ];

    public function positions()
    {
        return $this->hasMany(RecruitmentPosition::class, 'company_id', 'company_id');
    }
}
