<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRegisterOpenClassTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('register_open_class', function (Blueprint $table) {
            $table->id();
            $table->string('student_code');
            $table->string('subject_id');
            $table->tinyInteger('semester')->unsigned();
            $table->integer('year')->unsigned();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('register_open_class');
    }
}
