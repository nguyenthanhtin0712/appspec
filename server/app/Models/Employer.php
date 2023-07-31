<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Traits\HasRoles;

class Employer extends Model
{
    use HasFactory, HasRoles;

    protected $primaryKey = 'user_id';
    protected $fillable = [
        'user_id',
        'employer_company_name',
        'employer_company_website',
        'employer_company_address',
        'employer_company_email',
        'emloyer_company_phone',
        'employer_company_desc',
        'employer_isActive',
        'employer_isDelete'
    ];
}
