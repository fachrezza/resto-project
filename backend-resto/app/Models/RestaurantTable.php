<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RestaurantTable extends Model
{
    public function orders()
    {
        return $this->hasMany(Order::class, 'table_id');
    }
}
