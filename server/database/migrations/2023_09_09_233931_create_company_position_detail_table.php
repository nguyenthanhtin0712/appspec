<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCompanyPositionDetailTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('company_position_detail', function (Blueprint $table) {
            $table->id('company_position_detail_id');
            $table->unsignedBigInteger('register_internship_company_id');
            $table->integer('position_id');
            $table->integer('position_quantity');
            $table->foreign('register_internship_company_id')
                ->references('register_internship_company_id')->on('register_internship_company');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('company_position_detail');
    }
}
