<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Traits\HasRoles;

class Teacher extends Model
{
    use HasFactory, HasRoles;

    protected $primaryKey = 'teacher_id';
    protected $fillable = [
        'teacher_id',
        'teacher_code',
        'teacher_name',
        'teacher_phone',
        'teacher_email',
        'teacher_birthday',
        'teacher_title',
        'teacher_unit',
        'teacher_isDelete'
    ];
}
