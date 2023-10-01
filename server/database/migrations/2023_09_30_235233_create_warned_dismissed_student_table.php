<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWarnedDismissedStudentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('warned_dismissed_student', function (Blueprint $table) {
            $table->id('warned_dismissed_student_id');
            $table->string('student_code');
            $table->tinyInteger('student_year')->unsigned();
            $table->tinyInteger('student_semester')->unsigned();
            $table->tinyInteger('total_warning_count')->unsigned();
            $table->float('semester_gpa')->unsigned();
            $table->float('cumulative_gpa')->unsigned();
            $table->string('result', 3);
            $table->unsignedBigInteger('openclass_time_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('warned_dismissed_student');
    }
}
