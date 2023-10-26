<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Traits\HasRoles;

class Page extends Model
{
    use HasFactory, HasRoles;
    protected $table = 'pages';
    protected $primaryKey = 'page_id';
    protected $attributes = ['page_isDelete' => 0];
    protected $fillable = [
        'page_id',
        'page_slug',
        'page_title',
        'page_content',
        'page_isDelete'
    ];
}
