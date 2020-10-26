<?php
namespace App\Clases;

use Illuminate\Support\Facades\Artisan;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

//  clase auxiliar
use App\Clases\Conexion;

//  Modelos
use App\Models\Recetas;

class Roboshot{

    public static function CrearRoboshot($nombre){

        //  crea el espacio en la base de datos
        DB::statement("CREATE SCHEMA ".$nombre."");

        //  cambia archivo de configuracion de la base de datos
        Conexion::conectaNombre($nombre);

        //  tabla para categorias
        Schema::connection('roboshot')->create('categorias', function(Blueprint $table){
            $table->integer('idcategoria');
            $table->string('nombre')->nullable();
            $table->date('actualizado');
        });

        //  tabla para recetas
        Schema::connection('roboshot')->create('recetas', function(Blueprint $table){
            $table->integer('idReceta');
            $table->string('nombre')->nullable();
            $table->string('descripcion')->nullable();
            $table->float('precio', 4, 2);
            $table->boolean('activa');
            $table->string('img')->nullable();
            $table->date('actualizado');
        });

        //  tabla para ingredientes
        Schema::connection('roboshot')->create('ingredientes', function(Blueprint $table){
            $table->integer('idIngrediente');
            $table->integer('nombre')->nullable();
            $table->string('marca')->nullable();
            $table->float('precio', 4, 2);
            $table->date('actualizado');
        });

        // tabla relacion receta - ingrediente
        Schema::connection('roboshot')->create('recetaIngrediente', function(Blueprint $table){
            $table->integer('idReceta');
            $table->integer('idIngrediente');
            $table->integer('cantidad');
            $table->date('actualizado');
        });

        return true;
    }

    public static function recetasWeb($datos){

        //  establece la conexion a la base de datos de acuerdo al nombre
        Conexion::conectaNombre($datos->esquema);

        $dataRecetas = $datos->tablaReceta;
        $data = [];
        
        //  recorre el arreglo de recetas
        foreach($dataRecetas as $item){
            $busca = Recetas::findOrFail($item->id);
            if($busca){
                $data[] = $busca;
            }
        }

        return $data;

    }

    public static function ingredientesWeb($datos){

    }
}