<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('students', function (Blueprint $table) {
            $table->integer('user_id');
            $table->string('student_code');
            $table->string('student_class');
            $table->float('student_score')->nullable();
            $table->integer('student_course');
            $table->integer('major_id');
            $table->integer('specialty_id')->nullable();
            $table->date('speciality_date')->nullable();
            $table->integer('company_position_detail_id')->nullable();
            $table->integer('student_status')->default(1);
            $table->string('mentor_code')->nullable();
            $table->string('teacher_code')->nullable();
            $table->integer('student_isDelete')->default(0);
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
        Schema::dropIfExists('students');
    }
}
