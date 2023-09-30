<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Traits\HasRoles;

class InternshipGraduation extends Model
{
    use HasFactory, HasRoles;

    protected $primaryKey = 'internship_graduation_id';
    protected $keyType = 'integer';
    public $incrementing = false;
    public $timestamps = false;
    protected $hidden = ['created_at', 'updated_at'];
    protected $fillable = [
        'internship_graduation_id',
        'internship_graduation_start_date',
        'internship_graduation_end_date',
        'register_internship_start_date',
        'register_internship_end_date',
        'internship_graduation_status'
    ];

    public function openclasstime()
    {
        return $this->hasOne(OpenclassTime::class, 'openclass_time_id', 'internship_graduation_id');
    }
}
