<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Adoption extends Model
{
    /**
     * 
     * 
     * @list list<string>
     */
    protected $fillable = [
        'user_id',
        'pet_id'
    ];

    //Relationships:
    // adoption belongsTo a user
    public function user(){
        return $this->belongsTo(User::class);
    }

    // adoption belongs to a pet
    public function pet(){
        return $this->belongsTo(Pet::class);
    }
}
