<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $fillable = [
        'table_id',
        'name',
        'phone',
        'email',
        'guest_count',
        'reservation_date',
        'reservation_time',
        'status',
        'notes'
    ];

    public function table()
    {
        return $this->belongsTo(RestaurantTable::class);
    }
}
