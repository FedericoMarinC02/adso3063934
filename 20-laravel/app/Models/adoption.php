<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class adoption extends Model
{
    protected $fillable = [
        'user_id',
        'pet_id',
    ];
}
