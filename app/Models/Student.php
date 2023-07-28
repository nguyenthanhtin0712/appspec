<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Traits\HasRoles;

class Student extends Model
{
    use HasFactory, HasRoles;

    protected $primaryKey = 'user_id';

    protected $fillable = [
        'user_id',
        'student_code',
        'student_class',
        'student_score',
        'student_course',
        'major_id',
        'specialty_id',
        'speciality_date',
        'company_position_detail_id',
        'mentor_code',
        'teacher_code',
        'student_isDelete',
    ];

}
