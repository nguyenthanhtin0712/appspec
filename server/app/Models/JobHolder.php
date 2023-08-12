<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Traits\HasRoles;

class JobHolder extends Model
{
    use HasFactory, HasRoles;

    protected $table = 'job_holders';
    protected $primaryKey = 'jobholder_id';
    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'jobholder_id',
        'jobholder_name',
        'jobholder_birthday',
        'jobholder_email',
        'jobholder_phone',
        'jobholder_gender',
        'degree_id',
        'title_id',
        'academic_field_id',
        'jobholder_isDelete'
    ];

    public function degree() {
        return $this->belongsTo(Degree::class, 'degree_id', 'degree_id');
    }

    public function title() {
        return $this->belongsTo(Title::class, 'title_id', 'title_id');
    }

    public function academic_field() {
        return $this->belongsTo(AcademicField::class, 'academic_field_id', 'academic_field_id');
    }
}
