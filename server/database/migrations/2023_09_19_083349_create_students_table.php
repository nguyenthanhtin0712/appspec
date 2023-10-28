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
            $table->string('student_code')->primary();
            $table->string('student_class');
            $table->float('student_score')->nullable();
            $table->integer('student_course')->nullable();
            $table->string('major_id');
            $table->string('specialty_id')->nullable();
            $table->dateTime('specialty_date')->nullable();
            $table->integer('register_specialty_id')->nullable();
            $table->unsignedBigInteger('company_position_detail_id')->nullable();
            $table->integer('student_status')->default(1);
            $table->integer('mentor_code')->nullable();
            $table->unsignedBigInteger('jobholder_internship_id')->nullable();
            $table->integer('internship_graduation_id')->nullable();
            $table->double('internship_score')->nullable();
            $table->integer('student_isDelete')->default(0);
            $table->timestamps();
            $table->foreign('jobholder_internship_id')
            ->references('jobholder_internship_id')
            ->on('jobholder_internships')
            ->onDelete('cascade');
            $table->foreign('company_position_detail_id')
                ->references('company_position_detail_id')
                ->on('company_position_detail')
                ->onDelete('cascade');
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
