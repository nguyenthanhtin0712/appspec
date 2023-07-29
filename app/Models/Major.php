<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Traits\HasRoles;

class Major extends Model
{
    use HasFactory, HasRoles;
    protected $table = 'majors';
    protected $primaryKey = 'major_id';
    protected $fillable = [
        'major_id',
        'major_code',
        'major_name',
        'major_isDelete'
    ];

    public function specialties()
    {
        return $this->hasMany(Specialty::class, 'major_id', 'major_id');
    }
}
