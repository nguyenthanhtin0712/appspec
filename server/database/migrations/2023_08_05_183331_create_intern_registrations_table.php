<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInternRegistrationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('intern_registrations', function (Blueprint $table) {
            $table->id('intern_registration_id');
            $table->dateTime('intern_registration_start_date');
            $table->dateTime('intern_registration_end_date');
            $table->integer('intern_registration_semester');
            $table->integer('intern_registration_year');
            $table->integer('intern_registration_isDelete')->default(0);
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
        Schema::dropIfExists('intern_registrations');
    }
}
