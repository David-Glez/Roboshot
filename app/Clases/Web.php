<?php

namespace App\Clases;

use Illuminate\Support\Facades\DB;

//  clase auxiliar
use App\Clases\Conexion;
use Carbon\Carbon;

//  modelos
use App\Models\Recetas;
use App\Models\Clientes;
use App\Models\Ingredientes;
use App\Models\RecetaIngredientes;
use App\Models\Categorias;


class Web{

    //  trae todas las recetas de un cliente
    public static function inicio($datos){
        
        Conexion::conectaNombre($datos);
        $recipes = Recetas::all();

        DB::purge('roboshot');

        return $recipes;
        
    }

    // trae una receta de la bd de un cliente
    public static function receta($idReceta, $idCliente){

        // conexion con el esquema del cliente
        Conexion::conectaID($idCliente);

        // seleccion de la receta
        $recipes = Recetas::where('idReceta', $idReceta)->first();

        //  ingredientes de la receta
        $lista = [];
        $ingredientes = RecetaIngredientes::where('idReceta', $idReceta)->get();
        foreach($ingredientes as $item){
            $ing = Ingredientes::where('idIngrediente', $item->idIngrediente)->first();
            $cat = Categorias::where('idCategoria', $ing->nombre)->first();
            $data = array(
                'idIngrediente' => $ing->idIngrediente,
                'nombre' => $ing->marca,
                'idCategoria' => $cat->idCategoria,
                'categoria' => $cat->nombre,
                'cantidad' => $item->cantidad
            );

            $lista[] = $data;
        }

        //  datos del cliente
        $cliente = Clientes::find($idCliente);

        $datos = array(
            'idReceta' => $recipes->idReceta,
            'idCliente' => $idCliente,
            'cliente' => $cliente->nombres,
            'nombre' => $recipes->nombre,
            'descripcion' => $recipes->descripcion,
            'precio' => $recipes->precio,
            'img' => $recipes->img,
            'ingredientes' => $lista
        );

        return $datos;
    }

}