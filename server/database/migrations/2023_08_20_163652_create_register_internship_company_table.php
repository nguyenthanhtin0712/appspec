<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRegisterInternshipCompanyTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('register_internship_company', function (Blueprint $table) {
            $table->id('register_internship_company_id');
            $table->integer('internship_graduation_id');
            $table->integer('company_id');
            $table->boolean('company_isInterview')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('register_internship_company');
    }
}
