<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Traits\HasRoles;

class RegisterOpenClass extends Model
{
    use HasFactory, HasRoles;
    protected $table = 'register_open_class';
    public $timestamps = false;
    protected $fillable = [
        'id',
        'subject_id',
        'student_code',
        'semester',
        'year'
    ];
}
