<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJobhodlerInternshipsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('jobhodler_internships', function (Blueprint $table) {
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
        Schema::dropIfExists('jobhodler_internships');
    }
}
