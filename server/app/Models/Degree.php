<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Traits\HasRoles;

class Degree extends Model
{
    use HasFactory, HasRoles;

    protected $table = 'degrees';
    protected $primaryKey = 'degree_id';
    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'degree_id',
        'degree_name',
        'degree_isDelete'
    ];

    public function jobholder() {
        return $this->hasMany(JobHolder::class, 'degree_id', 'degree_id');
    }
}
