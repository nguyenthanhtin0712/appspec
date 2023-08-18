<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Traits\HasRoles;

class SubjectPrerequisite extends Model
{
    use HasFactory, HasRoles;
    protected $table = 'subject_prerequisites';
    public $incrementing = false;
    public $timestamps = false;
    protected $fillable = [
        'subject_prerequisite_id',
        'subject_id',
        'subject_previous_id'
    ];
}
