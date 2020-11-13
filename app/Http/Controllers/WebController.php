<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

//  clase auxiliar
use App\Clases\Web;

//  Modelos
use App\Models\Clientes;
use App\Models\Recetas;
use App\Models\Pedidos;

class WebController extends Controller
{
    //  muestra todas las recetas de la bd
    public function inicio(){

        $clientes = Clientes::all();

        $data = [];

        foreach($clientes as $i){
            $card = [];
            $x = Web::inicio($i->esquema);

            foreach($x as $recipe){
                
                $info = array(
                    'idReceta' => $recipe->idReceta,
                    'nombre' => $recipe->nombre,
                    'idCliente' => $i->idCliente,
                    'cliente' => $i->nombres,
                    'descripcion' => $recipe->descripcion,
                    'precio' => $recipe->precio,
                    'img' => $recipe->img, 
                );
                $card[] = $info;
            }
            $data[] = $card;
            
        }

        return response()->json($data);
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
        $pedidos->total = $request->total;
        $pedidos->save();

        //  devuelve el codigo del pedido
        return response()->json($codigo);
    }
}
