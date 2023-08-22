<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Database\Eloquent\Model;

class RegisterInternship extends Model
{
    use HasFactory, HasRoles;

    protected $table = 'register_internship';
    protected $primaryKey = 'register_internship_id';
    public $timestamps = true;
    protected $fillable = [
        'register_internship_id',
        'register_internship_start_date',
        'register_internship_end_date',
        'register_internship_isDelete',
    ];

    public function internship_graduation(){
        return $this->hasOne(InternshipGraduation::class, 'internship_graduation_id', 'register_internship_id');
    }
}
