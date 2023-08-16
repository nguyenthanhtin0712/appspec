<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Traits\HasRoles;

class RegisterSpecialty extends Model
{
    use HasFactory, HasRoles;

    protected $primaryKey = 'register_specialty_id';
    protected $fillable = [
        'register_specialty_id',
        'register_specialty_name',
        'register_specialty_start_date',
        'register_specialty_end_date',
        'register_specialty_isDelete',
    ];
    protected $attributes = [
        'register_specialty_isDelete' => 0,
    ];
    protected $hidden = ['created_at', 'updated_at'];

    public function specialty()
    {
        return $this->belongsToMany(Specialty::class, 'register_specialty_detail', 'register_specialty_id', 'specialty_id')->withPivot('specialty_quantity');
    }
}
