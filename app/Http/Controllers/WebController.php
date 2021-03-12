<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

//  clase auxiliar
use App\Clases\Web;

//  Modelos
use App\Models\Clientes;
use App\Models\Recetas;
use App\Models\Pedidos;
use App\Models\RecetaPedidos;
use App\Models\RecetaIngredientes;
use App\Models\IngredientePedidos;
use App\Models\Ingredientes;
use App\Models\Categorias;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use App\Services\ConnectSchemaPg as Connect;
use Illuminate\Support\Facades\DB;

class WebController extends Controller
{
    //  muestra todos los clientes registrados en la bd
    public function inicio(){
        $data = [];

        $clientes = Clientes::where('esquema', '!=', '')->get();
        foreach($clientes as $i){
            $link = Storage::disk('s3')->url($i->path);
            $datos = array(
                'idCliente' => $i->idCliente,
                'razonSocial' => $i->razonSocial,
                'logo' => $link
            );
            $data[] = $datos;
        }
        return response()->json($clientes);
    }

    //  selecciona todas las recetas de un cliente
    public function recetasCliente($idCliente){

        //  connect to client schema
        Connect::connectByID($idCliente);
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
            $recipeDetails = array(
                'id' => $recipe->id,
                'idReceta' => $recipe->idReceta,
                'idCliente' => $idCliente,
                'nombre' => $recipe->nombre,
                'descripcion' => $recipe->descripcion,
                'precio' => $recipe->precio,
                'img' => $recipe->img,
                'ingredientes' => $listIngredients
            );

            $data[] = $recipeDetails;
        } 

        DB::purge('roboshot');

        return response()->json($data);
    }

    //  trae los ingredientes y categorias de un ingrediente
    public function ingredientes($idCliente){

        Connect::connectByID($idCliente);

        //  extrae todas las categorias
        $categorias = Categorias::all();

        //  extrae todos los ingredientes
        $ingredientes = Ingredientes::all();

        //  arreglo con todos los datos
        $data = array(
            'categorias' => $categorias,
            'ingredientes' => $ingredientes
        );
        
        return response()->json($data);
    }

    //  trae una receta en especifico   TODO: delete route and function from controller
    public function receta($idReceta, $idCliente){

        $x = Web::receta($idReceta, $idCliente);
        
        return response()->json($x);
    }

    //  captura el pedido y genera el codigo para canjear
    public function pedido(Request $request){
        
        //  se genera el código del pedido
        $cadena = '0123456789';
        $longitud = strlen($cadena);
        $codigo = '001';    //TODO: get station ID and apply str_pad() function

        for($i = 0; $i < 5; $i++){
            $codigo .= $cadena[rand(0, $longitud-1)];
        }
        
        //  se inserta el codigo de pedido en la base de datos
        $pedidos = new Pedidos;
        $pedidos->codigo = $codigo;
        $pedidos->idUsuario = $request->usuario;
        $pedidos->total = $request->total;
        $pedidos->save();

        //  se decodifican las recetas solicitadas
        $arrayRecetas = json_decode($request->lista);

        //  se recorre el arreglo para insertar en bd
        foreach($arrayRecetas as $receta){

            $recetaPedido = new RecetaPedidos;
            $recetaPedido->codigo = $codigo;
            $recetaPedido->idProd = $receta->prod;
            $recetaPedido->idReceta = $receta->idReceta;
            $recetaPedido->idCliente = $receta->idCliente;
            $recetaPedido->nombre = $receta->nombre;
            $recetaPedido->precio = $receta->precio;
            $recetaPedido->save();

            //  se decodifican los ingredientes de la receta
            $arrayIngredientes = json_decode($receta->ingredientes);

            //  se insertan los ingredientes de la receta
            foreach($arrayIngredientes as $ingredientes){
                $ingredientesPedidos = new IngredientePedidos;
                $ingredientesPedidos->codigoProd = $codigo.'-'.$receta->prod;
                $ingredientesPedidos->idIngrediente = $ingredientes->idIngrediente;
                $ingredientesPedidos->idCategoria = $ingredientes->idCategoria;
                $ingredientesPedidos->marca = $ingredientes->nombre;
                //$ingredientesPedidos->posicion = $ingredientes->posicion;
                $ingredientesPedidos->cantidad = $ingredientes->cantidad;
                $ingredientesPedidos->precio = $ingredientes->precio;
                $ingredientesPedidos->save();
            }
            
        }

        //  devuelve el codigo del pedido
       return response()->json($codigo);
    }

    //  consulta del codigo para estacion local
    public function codigo($codigo){

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

        return response()->json($data);
    }
}
