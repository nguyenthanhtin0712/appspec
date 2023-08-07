<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Database\Eloquent\Model;

class InternRegistration extends Model
{
    use HasFactory, HasRoles;

    protected $primaryKey = 'intern_registration_id';
    protected $fillable = [
        'intern_registration_id',
        'intern_registration_start_date',
        'intern_registration_end_date',
        'intern_registration_semester',
        'intern_registration_year',
        'intern_registration_isDelete',
    ];
}
