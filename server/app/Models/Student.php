<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Traits\HasRoles;

class Student extends Model
{
    use HasFactory, HasRoles;

    protected $primaryKey = 'student_code';

    protected $fillable = [
        'user_id',
        'student_code',
        'student_class',
        'student_score',
        'student_course',
        'student_cmnd',
        'student_address',
        'student_nation',
        'student_religion',
        'major_id',
        'specialty_id',
        'specialty_date',
        'speciality_registration_id',
        'company_position_detail_id',
        'mentor_code',
        'internship_graduation_id',
        'jobholder_internship_id',
        'student_isDelete',
    ];

    public function major()
    {
        return $this->belongsTo(Major::class, 'major_id', 'major_id');
    }

    public function specialty()
    {
        return $this->belongsTo(Specialty::class, 'specialty_id', 'specialty_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

}