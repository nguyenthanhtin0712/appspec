<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Traits\HasRoles;

class JobPost extends Model
{
    use HasFactory, HasRoles;
    protected $table = 'job_posts';
    protected $primaryKey = 'job_post_id';
    protected $attributes = ['job_post_isDelete' => 0, 'job_post_confirm' => 0];
    protected $fillable = [
        'job_post_id',
        'job_post_title',
        'job_post_desc',
        'job_post_confirm',
        'user_id',
        'job_post_isDelete'
    ];
}
