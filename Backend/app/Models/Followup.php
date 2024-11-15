<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Followup extends Model
{
    /** @use HasFactory<\Database\Factories\FollowupFactory> */
    use HasFactory, HasApiTokens;

    //
    protected $fillable = [
        'lead_id',
        'scheduled_at',
        'status'
    ];
    public function leads(){
        return $this->belongsTo(Lead::class);
    }
}
