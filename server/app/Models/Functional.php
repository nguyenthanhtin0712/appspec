<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Functional extends Model
{
    use HasFactory;

    public $primaryKey = "functional_code";
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'functional_code',
        'functional_name'
    ];

}
