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
    protected $keyType = 'string';
    public $incrementing = false;
    protected $fillable = [
        'specialty_id',
        'specialty_name',
        'major_id',
        'specialty_isDelete'
    ];

    public function register_specialty()
    {
        return $this->belongsToMany(RegisterSpecialty::class, 'register_specialty_detail', 'specialty_id', 'register_specialty_id');
    }

    public function major()
    {
        return $this->belongsTo(Major::class, 'major_id', 'major_id');
    }

    public function student()
    {
        return $this->hasMany(Student::class, 'specialty_id', 'specialty_id');
    }
}
