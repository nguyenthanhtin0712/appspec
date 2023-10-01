<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Traits\HasRoles;

class OpenclassTime extends Model
{
    use HasFactory, HasRoles;

    protected $primaryKey = 'openclass_time_id';
    public $timestamps = false;

    protected $fillable = [
        'openclass_time_id',
        'openclass_time_semester',
        'openclass_time_year',
    ];

    public function subjects()
    {
        return $this->hasMany(OpenClassSubject::class, 'openclass_time_id', 'openclass_time_id');
    }

    public function warned_student()
    {
        return $this->hasMany(WarnedDismissedStudent::class, 'openclass_time_id', 'openclass_time_id');
    }
}
