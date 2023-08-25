<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Traits\HasRoles;

class JobHolder extends Model
{
    use HasFactory, HasRoles;

    protected $table = 'job_holders';
    protected $primaryKey = 'user_id';
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'jobholder_code',
        'title_id',
        'academic_field_id',
        'jobholder_isLeader',
        'jobholder_unit',
        'jobholder_specialty',
        'jobholder_position',
        'jobholder_type',
        'jobholder_degree',
        'jobholder_isDelete'
    ];

    public function user() {
        return $this->hasOne(User::class, 'user_id', 'user_id');
    }


    public function title() {
        return $this->belongsTo(Title::class, 'title_id', 'title_id');
    }

    public function academic_field() {
        return $this->belongsTo(AcademicField::class, 'academic_field_id', 'academic_field_id');
    }
}
