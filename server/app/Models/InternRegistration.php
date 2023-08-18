<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Database\Eloquent\Model;

class InternRegistration extends Model
{
    use HasFactory, HasRoles;

    protected $primaryKey = 'internship_graduation_id';
    public $timestamps = true;
    protected $fillable = [
        'internship_graduation_id',
        'intern_registration_name',
        'intern_registration_start_date',
        'intern_registration_end_date',
        'intern_registration_isDelete',
    ];
}
