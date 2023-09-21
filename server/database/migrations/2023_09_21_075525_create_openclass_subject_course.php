<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOpenclassSubjectCourse extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('openclass_subject_course', function (Blueprint $table) {
            $table->id('openclass_subject_course_id');
            $table->unsignedBigInteger('openclass_subject_id');
            $table->string('openclass_subject_for_course');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('openclass_subject_course');
    }
}
