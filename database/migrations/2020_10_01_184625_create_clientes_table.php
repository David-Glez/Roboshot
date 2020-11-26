<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clientes', function (Blueprint $table) {
            $table->bigIncrements('idCliente');
            $table->integer('idUsuario');
            $table->string('razonSocial')->nullable();
            $table->string('logo')->nullable();
            $table->string('nombres');
            $table->string('apellidoPaterno');
            $table->string('apellidoMaterno')->nullable();
            $table->string('RFC')->nullable();
            $table->string('email');
            $table->string('esquema')->nullable();
            $table->string('directorio')->nullable();
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
        Schema::dropIfExists('clientes');
    }
}
