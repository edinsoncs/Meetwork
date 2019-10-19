<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrdersTime extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'date_now', 'hour_start', 'hour_end', 'created_at', 'updated_at'
    ];


    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [];
}
