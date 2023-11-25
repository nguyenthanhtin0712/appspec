<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Traits\HasRoles;

class Contact extends Model
{
    use HasFactory, HasRoles;
    protected $primaryKey = 'contact_id';
    public $incrementing = true;
    public $timestamps = true;
    protected $fillable = [
        'contact_id',
        'contact_fullname',
        'contact_phone',
        'contact_email',
        'contact_content',
        'contact_check',
        'contact_isDelete',
    ];
}
