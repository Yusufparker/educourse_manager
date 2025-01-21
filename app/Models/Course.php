<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $fillable = [
        'slug',
        'title',
        'description',
        'price',
        'is_active',
        'thumbnail'
    ];
}
