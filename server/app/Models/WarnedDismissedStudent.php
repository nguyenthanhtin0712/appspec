<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Traits\HasRoles;


class WarnedDismissedStudent extends Model
{
    use HasFactory, HasRoles;

    protected $table = 'warned_dismissed_student';
    protected $primaryKey = 'warned_dismissed_student_id';
    public $timestamps = false;
    protected $fillable = [
        'warned_dismissed_student_id',
        'student_id',
        'student_year',
        'student_semester',
        'total_warning_count',
        'semester_gpa',
        'cumulative_gpa',
        'result',
        'openclass_time_id'
    ];

    public function student()
    {
        return $this->hasOne(Student::class, 'student_code', 'student_id');
    }
}
