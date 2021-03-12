<?php

namespace App\Clases;

use Illuminate\Support\Facades\DB;

//  clase auxiliar
use App\Clases\Conexion;
use Carbon\Carbon;

//  modelos
use App\Models\Recetas;
use App\Models\Ingredientes;
use App\Models\RecetaIngredientes;
use App\Models\Categorias;
use App\Models\RecetaPedidos;
use App\Models\IngredientePedidos;
use App\Models\Pedidos;
use App\Models\User;

class Web{

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
            $cat = Categorias::where('idCategoria', $ing->categoria)->first();
            $data = array(
                'idIngrediente' => $ing->idIngrediente,
                'nombre' => $ing->marca,
                'idCategoria' => $cat->idCategoria,
                'categoria' => $cat->nombre,
                //'posicion' => $ing->posicion,
                'cantidad' => $item->cantidad,
                'precio' => $ing->precio
            );

            $lista[] = $data;
        }
 
        $datos = array(
            'idReceta' => $recipes->idReceta,
            'idCliente' => $idCliente,
            'cliente' => '',
            'nombre' => $recipes->nombre,
            'descripcion' => $recipes->descripcion,
            'precio' => $recipes->precio,
            'img' => $recipes->img,
            'ingredientes' => $lista
        );

        return $datos;
    }

    public static function codigo($codigo){
        $recetaPedido = [];
        
        //  busca el pedido con el codigo
        $pedido = Pedidos::where('codigo', $codigo)->first();
        $user = User::find($pedido->idUsuario);

        //  busca las recetas del pedido
        $recetas = RecetaPedidos::where('codigo', $codigo)->get();

        //  busca los ingredientes
        foreach($recetas as $recipe){

            //  llave compuesta
            $id = $codigo.'-'.$recipe->idProd;
            $ingredientePedido = [];

            $ingredientes = IngredientePedidos::where('codigoProd', $id)->get();

            //  genera la lista de ingredientes por receta
            foreach($ingredientes as $ing){
                $ingr = array(
                    'idIngrediente' => $ing->idIngrediente,
                    'idCategoria' => $ing->idCategoria,
                    //'posicion' => $ing->posicion,
                    'marca' => $ing->marca,
                    'cantidad' => $ing->cantidad,
                    'precio' => $ing->precio
                );
                $ingredientePedido[] = $ingr;
            }

            $rec = array(
                'idProd' => $recipe->idProd,
                'idReceta' => $recipe->idReceta,
                'idCliente' => $recipe->idCliente,
                'nombre' => $recipe->nombre,
                'precio' => $recipe->precio,
                'ingredientes' => $ingredientePedido
            );

            $recetaPedido[] = $rec;
            
        }

        $data = array(
            'codigo' => $codigo,
            'usuario' => $user->nombre,
            'total' => $pedido->total,
            'cliente' => '-',
            'lista'=> $recetaPedido
        );

        return $data;
    }

}