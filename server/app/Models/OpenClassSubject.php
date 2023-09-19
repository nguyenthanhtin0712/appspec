<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Traits\HasRoles;

class OpenClassSubject extends Model
{
    use HasFactory, HasRoles;

    protected $table = 'openclass_subject';
    protected $primaryKey = 'openclass_subject_id';
    public $timestamps = false;
    protected $fillable = [
        'openclass_subject_id',
        'subject_id',
        'openclass_totalgroup',
        'openclass_totalstudent',
        'openclass_course',
    ];
}
