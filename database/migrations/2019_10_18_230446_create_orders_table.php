<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->increments('id');
            
            //Aqui foreingkey api
            $table->string('user_id');
            $table->string('place_id');
            //Aqui foreingkey api
            $table->boolean('status');

            //Aqui foreingkey next continuo
            $table->string('time_id');
            //Aqui foreingkey next continuo
            
            $table->dateTime('updated_at');
            
            $table->dateTime('created_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
