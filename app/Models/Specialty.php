<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Database\Eloquent\Model;

class Specialty extends Model
{
    use HasFactory, HasRoles;
    protected $table = 'specialties';
    protected $primaryKey = 'specialty_id';
    protected $fillable = [
        'specialty_id',
        'specialty_code',
        'specialty_name',
        'major_id',
        'specialty_isDelete'
    ];
}
