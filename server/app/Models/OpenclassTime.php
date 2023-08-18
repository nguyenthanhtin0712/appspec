<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Traits\HasRoles;

class OpenclassTime extends Model
{
    use HasFactory, HasRoles;

    protected $primaryKey = 'openclass_id';
    public $timestamps = false;

    protected $fillable = [
        'openclass_id',
        'openclass_semester',
        'openclass_year',
    ];
}
