<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContactConfigsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contact_configs', function (Blueprint $table) {
            $table->id('contact_config_id');
            $table->string('department_name');
            $table->string('department_address');
            $table->string('department_phone');
            $table->string('department_email');
            $table->string('admin_name');
            $table->string('admin_phone');
            $table->string('admin_email');
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
        Schema::dropIfExists('contact_configs');
    }
}
