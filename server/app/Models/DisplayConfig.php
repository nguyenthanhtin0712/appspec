<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Traits\HasRoles;

class DisplayConfig extends Model
{
    use HasFactory, HasRoles;
    protected $table = 'configs';
    protected $primaryKey = 'config_id';
    protected $keyType = 'string';
    public $incrementing = false;
    public $timestamps = false;
    protected $fillable = [
        'config_id',
        'config_name',
        'config_value'
    ];
}
