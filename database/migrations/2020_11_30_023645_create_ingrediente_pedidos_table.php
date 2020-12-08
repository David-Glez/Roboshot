<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIngredientePedidosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ingredientePedidos', function (Blueprint $table) {
            $table->string('codigoProd');
            $table->integer('idIngrediente');
            $table->integer('idCategoria');
            $table->string('marca');
            $table->integer('posicion');
            $table->integer('cantidad');
            $table->float('precio');
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
        Schema::dropIfExists('ingredientePedidos');
    }
}
