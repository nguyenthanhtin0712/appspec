<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRegisterSpecialtyTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('register_specialties', function (Blueprint $table) {
            $table->id('register_specialty_id');
            $table->string('register_specialty_name');
            $table->dateTime('register_specialty_start_date');
            $table->dateTime('register_specialty_end_date');
            $table->integer('register_specialty_isDelete')->default(0);
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
        Schema::dropIfExists('register_specialty');
    }
}
