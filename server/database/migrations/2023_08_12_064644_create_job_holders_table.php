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
            $table->string('jobholder_code')->unique();
            $table->integer('title_id');
            $table->string('academic_field_id');
            $table->integer('jobholder_isLeader');
            $table->string('jobholder_unit');
            $table->string('jobholder_specialty');
            $table->string('jobholder_position');
            $table->string('jobholder_type');
            $table->string('jobholder_degree');
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
