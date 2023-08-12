<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Traits\HasRoles;

class Title extends Model
{
    use HasFactory, HasRoles;

    protected $table = 'titles';
    protected $primaryKey = 'title_id';
    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'title_id',
        'title_name',
        'title_isDelete'
    ];

    public function jobholder() {
        return $this->hasMany(JobHolder::class, 'title_id', 'title_id');
    }
}
