<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mentor extends Model
{
    use HasFactory;
    protected $primaryKey = 'mentor_code';
    public $incrementing = true;
    public $timestamps = true;
    protected $fillable = [
        'mentor_code',
        'mentor_name',
        'mentor_phone',
        'mentor_email',
        'mentor_isDelete',
    ];
}
