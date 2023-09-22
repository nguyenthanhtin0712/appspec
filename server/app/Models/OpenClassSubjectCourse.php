<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Traits\HasRoles;

class OpenClassSubjectCourse extends Model
{
    use HasFactory, HasRoles;

    protected $table = 'openclass_subject_course';
    protected $primaryKey = 'openclass_subject_course_id';
    public $timestamps = false;
    protected $fillable = [
        'openclass_subject_course_id',
        'openclass_subject_id',
        'openclass_subject_for_course'
    ];
}
