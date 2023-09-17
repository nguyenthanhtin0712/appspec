<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Traits\HasRoles;

class JobhodlerInternship extends Model
{
    use HasFactory, HasRoles;
    public $incrementing = false;
    protected $fillable = [
        'jobholder_code',
        'internship_graduation_id',
    ];
}
