<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRegisterSpecialtyDetailTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('register_specialty_detail', function (Blueprint $table) {
            $table->id('register_specialty_detail_id');
            $table->integer('register_specialty_id');
            $table->string('specialty_id');
            $table->integer('specialty_quantity');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('register_specialty_detail');
    }
}
