<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Adoption extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'pet_id',
    ];
    // relationships 
    // adoptions belongTo user 

    public function user(){
        return $this->belongsTo(User::class); 
    }
    public function pet(){
        return $this->belongsTo(Pet::class); 
    }
    
    // Scope for search
    public function scopeNames($query, $q)
    {
        if (trim($q)) {
            $query->where('id', 'LIKE', "%$q%")
                ->orWhereHas('user', function($query) use ($q) {
                    $query->where('fullname', 'LIKE', "%$q%")
                          ->orWhere('email', 'LIKE', "%$q%");
                })
                ->orWhereHas('pet', function($query) use ($q) {
                    $query->where('name', 'LIKE', "%$q%")
                          ->orWhere('kind', 'LIKE', "%$q%");
                });
        }

        return $query;
    }
}
