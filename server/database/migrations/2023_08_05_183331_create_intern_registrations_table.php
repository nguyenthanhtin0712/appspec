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
            $table->integer('internship_graduation_id');
            $table->string('intern_registration_name');
            $table->dateTime('intern_registration_start_date');
            $table->dateTime('intern_registration_end_date');
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
