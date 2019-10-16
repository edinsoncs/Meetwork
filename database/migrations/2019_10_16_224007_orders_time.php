<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class OrdersTime extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orderstime', function (Blueprint $table) {
            $table->increments('id');
            $table->dateTime('date_now');
            $table->string('hour_start');
            $table->string('hour_end');
            $table->dateTime('created_at')->default('CURRENT_TIMESTAMP')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
