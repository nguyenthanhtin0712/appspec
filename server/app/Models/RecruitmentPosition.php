<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Traits\HasRoles;

class RecruitmentPosition extends Model
{
    use HasFactory, HasRoles;
    protected $primaryKey = 'position_id';
    protected $fillable = [
        'position_id',
        'position_name'
    ];
}
