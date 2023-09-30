<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInternshipGraduationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('internship_graduations', function (Blueprint $table) {
            $table->integer('internship_graduation_id')->primary();
            $table->date('internship_graduation_start_date');
            $table->date('internship_graduation_end_date');
            $table->dateTime('register_internship_start_date')->nullable();
            $table->dateTime('register_internship_end_date')->nullable();
            $table->boolean('internship_graduation_status')->default(false);
            $table->boolean('internship_graduation_isDelete')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('internship_graduations');
    }
}
