<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJobHoldersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('job_holders', function (Blueprint $table) {
            $table->integer('user_id');
            $table->string('jobholder_code');
            $table->integer('degree_id');
            $table->integer('title_id');
            $table->string('academic_field_id');
            $table->integer('jobholder_isLeader');
            $table->integer('jobholder_isDelete')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('job_holders');
    }
}
