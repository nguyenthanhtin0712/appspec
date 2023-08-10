<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTeachersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('teachers', function (Blueprint $table) {
            $table->string('teacher_id');
            $table->string('teacher_name');
            $table->string('teacher_phone')->nullable();
            $table->string('teacher_email')->nullable();
            $table->date('teacher_birthday')->nullable();
            $table->string('teacher_title')->nullable();
            $table->string('teacher_spec')->nullable();
            $table->string('teacher_unit')->nullable();
            $table->integer('teacher_isDelete')->default(0);
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
        Schema::dropIfExists('teachers');
    }
}
