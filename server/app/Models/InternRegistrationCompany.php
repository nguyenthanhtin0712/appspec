<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Database\Eloquent\Model;

class InternRegistrationCompany extends Model
{
    use HasFactory, HasRoles;

    protected $primaryKey = 'intern_registration_company_id';
    public $timestamps = false;
    protected $fillable = [
        'intern_registration_company_id',
        'intern_registration_id',
        'company_id',
    ];
}
