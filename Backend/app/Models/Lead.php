<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Lead extends Model
{
    /** @use HasFactory<\Database\Factories\LeadFactory> */
    use HasFactory, HasApiTokens;

    protected $fillable = [
        'name',
        'email',
        'phone'
    ];

    public function followups(){
        return $this->hasMany(Followup::class);
    }
}
