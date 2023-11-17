<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Traits\HasRoles;

class AcademicField extends Model
{
    use HasFactory, HasRoles;

    protected $table = 'academic_fields';
    protected $primaryKey = 'academic_field_id';
    protected $keyType = 'string';
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'academic_field_id',
        'academic_field_name',
        'academic_field_isDelete'
    ];

    public function jobholder() {
        return $this->hasMany(JobHolder::class, 'academic_field_id', 'academic_field_id');
    }

    public function subject() {
        return $this->hasMany(Subject::class, 'academic_field_id', 'academic_field_id');
    }
}
