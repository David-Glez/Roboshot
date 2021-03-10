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

    //  trae todas las recetas de un cliente
    public static function inicio($datos){
        
        Conexion::conectaID($datos);
        $data = [];
        $recipes = Recetas::where('activa', true)->get();
        foreach($recipes as $recipe){
            $listIngredients = [];
            $ingredients = RecetaIngredientes::where('idReceta', $recipe->idReceta)
                        ->where('roboshot', $recipe->roboshot)->get();
            foreach($ingredients as $ingredient){
                $ing = Ingredientes::where('idIngrediente', $ingredient->idIngrediente)
                    ->where('roboshot', $ingredient->roboshot)->first();
                $category = Categorias::where('idCategoria', $ing->categoria)
                    ->where('roboshot', $ing->roboshot)->first();
                $ingredientDetail = array(
                    'idIngrediente' => $ing->idIngrediente,
                    'nombre' => $ing->marca,
                    'idCategoria' => $category->idCategoria,
                    'categoria' => $category->nombre,
                    'cantidad' => $ingredient->cantidad,
                    'precio' => $ing->precio
                );
                $listIngredients[] = $ingredientDetail;             
            }
            $link = Storage::disk('s3')->url($recipe->path);
            $recipeDetails = array(
                'id' => $recipe->id,
                'idReceta' => $recipe->idReceta,
                'idCliente' => $datos,
                'nombre' => $recipe->nombre,
                'descripcion' => $recipe->descripcion,
                'precio' => $recipe->precio,
                'img' => $link,
                'ingredientes' => $listIngredients
            );

            $data[] = $recipeDetails;
        } 

        DB::purge('roboshot');

        return $data;
        
    }

    //  trae los ingredientes de un cliente
    public static function ingredientes($idCliente){

        //  conexion con el esquema del cliente
        Conexion::conectaID($idCliente);

        //  extrae todas las categorias
        $categorias = Categorias::all();

        //  extrae todos los ingredientes
        $ingredientes = Ingredientes::all();

        //  arreglo con todos los datos
        $data = array(
            'categorias' => $categorias,
            'ingredientes' => $ingredientes
        );

        return $data;
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