<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRecetaPedidosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('recetaPedidos', function (Blueprint $table) {
            $table->string('codigo');
            $table->integer('idProd');
            $table->integer('idReceta');
            $table->integer('idCliente');
            $table->string('nombre');
            $table->float('precio', 4, 2);
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
        Schema::dropIfExists('recetaPedidos');
    }
}
