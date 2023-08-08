<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCompanyPositionDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('company_position_details', function (Blueprint $table) {
            $table->integer('company_position_detail_id');
            $table->integer('intern_registration_company_id');
            $table->integer('position_id');
            $table->integer('position_quantity');
            $table->string('position_note');
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
        Schema::dropIfExists('company_position_details');
    }
}