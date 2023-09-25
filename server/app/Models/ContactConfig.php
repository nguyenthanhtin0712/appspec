<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactConfig extends Model
{
    use HasFactory;
    protected $primaryKey = 'contact_config_id';
    public $incrementing = true;
    public $timestamps = true;
    protected $fillable = [
        'contact_config_id',
        'department_name',
        'department_address',
        'department_phone',
        'department_email',
        'admin_name',
        'admin_phone',
        'admin_email',
    ];
}
