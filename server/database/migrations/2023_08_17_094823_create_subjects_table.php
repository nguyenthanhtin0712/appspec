<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSubjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('subjects', function (Blueprint $table) {
            $table->string('subject_id')->primary();
            $table->string('subject_name');
            $table->tinyInteger('subject_credit');
            $table->float('subject_coeffcient')->nullable();
            $table->tinyInteger('subject_LT')->nullable();
            $table->tinyInteger('subject_BT')->nullable();
            $table->tinyInteger('subject_TH')->nullable();
            $table->string('academic_field_id')->nullable();
            $table->tinyInteger('subject_isDelete')->length(1)->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('subjects');
    }
}
