<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class OrdersInvitation extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('orders_invitation', function (Blueprint $table) {
            $table->increments('id');
            $table->string('email');

            //Aqui foreingkey next continuo
            $table->string('order_id');
            //Aqui foreingkey next continuo
            //
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
