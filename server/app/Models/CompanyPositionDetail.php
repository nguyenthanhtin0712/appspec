<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Database\Eloquent\Model;

class CompanyPositionDetail extends Model
{
    use HasFactory, HasRoles;

    protected $primaryKey = 'company_position_detail_id';
    public $timestamps = false;
    protected $fillable = [
        'company_position_detail_id',
        'intern_registration_company_id',
        'position_id',
        'position_quantity',
        'position_note',
    ];
}
