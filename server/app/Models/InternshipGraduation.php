<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Traits\HasRoles;

class InternshipGraduation extends Model
{
    use HasFactory, HasRoles;

    protected $primaryKey = 'internship_graduation_id';
    public $timestamps = false;

    protected $fillable = [
        'internship_graduation_id',
        'openclass_time_id',
        'internship_graduation_start_date',
        'internship_graduation_end_date',
    ];

    public function openclasstime(){
        return $this->hasOne(OpenclassTime::class, 'openclass_time_id', 'openclass_time_id');
    }
}
