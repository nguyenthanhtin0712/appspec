<?php

namespace App\Models;

use Database\Seeders\IntershipCompanySeeder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Traits\HasRoles;

class RecruitmentPosition extends Model
{
    use HasFactory, HasRoles;

    protected $primaryKey = 'position_id';
    public $timestamps = false;
    protected $attributes = ['position_isDelete' => 0];
    protected $fillable = [
        'position_id',
        'position_name',
        'company_id'
    ];

    public function company()
    {
        return $this->belongsTo(IntershipCompanySeeder::class, 'company_id', 'company_id');
    }
}
