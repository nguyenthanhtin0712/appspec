<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOpenclassSubjectTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('openclass_subject', function (Blueprint $table) {
            $table->id('openclass_subject_id');
            $table->string('subject_id');
            $table->unsignedBigInteger('openclass_time_id');
            $table->integer('openclass_totalgroup');
            $table->integer('openclass_totalstudent');
            $table->integer('openclass_course');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('openclass_subject');
    }
}
