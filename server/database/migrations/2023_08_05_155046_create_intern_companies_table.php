<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInternCompaniesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('intern_companies', function (Blueprint $table) {
            $table->id('company_id');
            $table->string('company_name');
            $table->string('company_phone');
            $table->string('company_email');
            $table->string('company_address');
            $table->string('company_host');
            $table->integer('company_is_official');
            $table->integer('company_isDelete')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('intern_companies');
    }
}
