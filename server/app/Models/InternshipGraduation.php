<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Traits\HasRoles;

class InternshipGraduation extends Model
{
    use HasFactory, HasRoles;

    protected $primaryKey = 'openclass_time_id';
    protected $keyType = 'integer';
    public $incrementing = false;
    public $timestamps = false;
    protected $hidden = ['created_at', 'updated_at'];
    protected $fillable = [
        'openclass_time_id',
        'openclass_time_id',
        'internship_graduation_start_date',
        'internship_graduation_end_date',
    ];

    public function openclasstime()
    {
        return $this->hasOne(OpenclassTime::class, 'openclass_time_id', 'openclass_time_id');
    }

    public function register_internship()
    {
        return $this->hasOne(RegisterInternship::class, 'register_internship_id', 'openclass_time_id');
    }
}
