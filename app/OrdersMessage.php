<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrdersMessage extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'text', 'order_id', 'created_at', 'updated_at'
    ];



    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [];
}
