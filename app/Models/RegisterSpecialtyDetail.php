<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Traits\HasRoles;

class RegisterSpecialtyDetail extends Model
{
    use HasFactory, HasRoles;
    protected $table = 'register_specialty_detail';
    protected $primaryKey = 'register_specialty_detail_id';
    protected $fillable = [
        'register_specialty_detail_id',
        'register_specialty_id',
        'specialty_id',
        'specialty_quantity'
    ];
}
