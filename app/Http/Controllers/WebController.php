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
use App\Models\IngredientePedidos;

class WebController extends Controller
{
    //  muestra todos los clientes registrados en la bd
    public function inicio(){
        $data = [];

        $clientes = Clientes::where('esquema', '!=', '')->get();
        foreach($clientes as $i){
            $datos = array(
                'idCliente' => $i->idCliente,
                'razonSocial' => $i->razonSocial,
                'logo' => $i->logo
            );

            $data[] = $datos;
        }
        return response()->json($data);
     
    }

    //  selecciona todas las recetas de un cliente
    public function recetasCliente($idCliente){

        $x = Web::inicio($idCliente);

        return response()->json($x);
    }

    //  trae los ingredientes y categorias de un ingrediente
    public function ingredientes($idCliente){

        $x = Web::ingredientes($idCliente);
        
        return response()->json($x);
    }

    //  trae una receta en especifico
    public function receta($idReceta, $idCliente){

        $x = Web::receta($idReceta, $idCliente);
        
        return response()->json($x);
    }

    //  captura el pedido y genera el codigo para canjear
    public function pedido(Request $request){
        
        //  se genera el código del pedido
        $cadena = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $longitud = strlen($cadena);
        $codigo = 'rob-web-';

        for($i = 0; $i < 7; $i++){
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
                $ingredientesPedidos->posicion = $ingredientes->posicion;
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

        $x = Web::codigo($codigo);

        return response()->json($x);
    }
}
