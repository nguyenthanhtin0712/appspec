<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Traits\HasRoles;

class Subject extends Model
{
    use HasFactory, HasRoles;
    protected $table = 'subjects';
    protected $primaryKey = 'subject_id';
    protected $keyType = 'string';
    public $incrementing = false;
    public $timestamps = false;
    protected $attributes = ['subject_isDelete' => 0];
    protected $fillable = [
        'subject_id',
        'subject_name',
        'subject_credit',
        'subject_coeffcient',
        'subject_LT',
        'subject_BT',
        'subject_TH',
        'academic_field_id',
        'subject_isDelete'
    ];

    public function academic_field()
    {
        return $this->belongsTo(AcademicField::class, 'academic_field_id', 'academic_field_id');
    }

    public function subject_previous() {
        return $this->belongsToMany(Subject::class, 'subject_prerequisites', 'subject_id', 'subject_previous_id');
    }
}
