<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmployersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employers', function (Blueprint $table) {
            $table->id('user_id');
            $table->string('employer_name');
            $table->string('employer_website')->nullable();
            $table->string('employer_email');
            $table->string('employer_phone');
            $table->string('employer_desc');
            $table->string('employer_isActive')->default(0);
            $table->string('employer_isDelete')->default(0);
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
        Schema::dropIfExists('employers');
    }
}
