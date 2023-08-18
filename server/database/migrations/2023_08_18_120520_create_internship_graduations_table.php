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
            $table->id('internship_graduation_id');
            $table->integer('openclass_time_id');
            $table->date('internship_graduation_start_date');
            $table->date('internship_graduation_end_date');
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
