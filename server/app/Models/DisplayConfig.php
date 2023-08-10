<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Traits\HasRoles;

class DisplayConfig extends Model
{
    use HasFactory, HasRoles;
    protected $table = 'display_configs';
    protected $primaryKey = 'display_config_id';
    protected $keyType = 'string';
    public $incrementing = false;
    public $timestamps = false;
    protected $fillable = [
        'display_config_id',
        'display_config_name',
        'display_config_value'
    ];
}
