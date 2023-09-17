<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Traits\HasRoles;

class JobholderInternship extends Model
{
    use HasFactory, HasRoles;
    public $table = 'jobholder_internships';
    public $timestamps = false;
    public $incrementing = false;
    protected $fillable = [
        'jobholder_code', 'internship_graduation_id'
    ];

    public function jobholder()
    {
        return $this->hasOne(JobHolder::class, 'jobholder_code', 'jobholder_code');
    }
}
