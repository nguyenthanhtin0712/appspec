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
        'internship_graduation_id',
        'company_id',
        'company_isInterview'
    ];

    public function positions()
    {
        return $this->belongsToMany(
            RecruitmentPosition::class,
            'company_position_detail',
            'register_internship_company_id',
            'position_id'
        )
            ->withPivot('position_quantity');
    }

    public function companies()
    {
        return $this->belongsToMany(Company::class, 'register_internship_company', 'internship_graduation_id', 'company_id')->withPivot('company_isInterview');
    }
}
