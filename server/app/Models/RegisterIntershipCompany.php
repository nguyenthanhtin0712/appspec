<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Database\Eloquent\Model;

class RegisterIntershipCompany extends Model
{
    use HasFactory, HasRoles;

    protected $table = 'register_internship_company';
    protected $primaryKey = 'register_internship_company_id';
    public $timestamps = false;
    protected $fillable = [
        'register_internship_company_id',
        'register_internship_id',
        'company_id',
    ];
}
