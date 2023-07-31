<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id('user_id');
            $table->string('user_email')->nullable();
            $table->string('user_firstname');
            $table->string('user_lastname');
            $table->string('user_phone')->nullable();
            $table->string('user_avatar')->nullable();
            $table->string('user_password');
            $table->integer('user_gender');
            $table->integer('user_status')->default(1);
            $table->date('user_birthday');
            $table->integer('user_isDelete')->default(0);
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
}
