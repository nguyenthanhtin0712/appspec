<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJobholderInternshipsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('jobholder_internships', function (Blueprint $table) {
            $table->integer('jobholder_code');
            $table->integer('internship_graduation_id');
            $table->primary(['jobholder_code', 'internship_graduation_id'], 'jobholder_internship_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('jobholder_internships');
    }
}
